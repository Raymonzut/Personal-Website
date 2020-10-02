# Templates will be filled by posts
index_template = File.read!("./templates/post_index_page.html")
post_template = File.read!("./templates/post_single_page.html")

post_contents = File.ls!("./posts")
  |> Enum.reject(fn(x) -> String.starts_with?(x, ".") end)
  |> Enum.map(fn f -> File.read!("./posts/" <> f) end)
  |> Enum.map(fn c -> String.split(c, "\n") end)
  |> Enum.map(fn c -> Enum.reject(c, fn(x) -> x == "" end) end)
  |> Enum.map(fn c -> Enum.chunk_every(c, 2) end)
  |> Enum.map(fn c ->
      Enum.map(c, fn [k, v] -> %{String.to_atom(k) => v} end)
      |> Enum.reduce(%{}, fn(x, acc) -> Map.merge(x, acc) end)
     end)

index_file = post_contents
  |> Enum.sort_by(fn m -> Map.get(m, :date) end)
  |> Enum.reverse()
  # Group by month
  |> Enum.group_by(fn m -> Map.get(m, :date) |> String.slice(0..6) end)
  |> Enum.reverse()
  |> Enum.map(fn {month, posts} -> "\n<h1>" <> month <> "</h1>\n" <> (posts |>
      Enum.map(fn post -> "<h2>" <> (Map.get(post, :date) |> String.slice(0..9)) <>
                        " - <a href=\"" <> Map.get(post, :id) <> ".html\">" <> Map.get(post, :title) <> "</a></h2>"
      end) |> Enum.join("\n")) end) 
  |> (fn template -> Regex.replace(Regex.compile!("{{index}}"), index_template, fn _, __ -> template end) end).()

File.open!("./gen/index.html", [:write])
  |> IO.binwrite(index_file)
  |> File.close()


post_contents
  |> Enum.each(fn post ->
      File.open!("./gen/" <> Map.get(post, :id) <> ".html", [:write])
      |> IO.binwrite(
          # Converting handlebars to values
          Regex.compile!("{{(.*)}}") |>
          Regex.replace(post_template, fn _, key -> if key != "content" do Map.get(post, String.to_atom(key)) else
            Map.get(post, String.to_atom(key))
            # Converting \n to paragraphs
            |> String.split("\\n")
            |> Enum.reject(fn(x) -> x == "" end)
            |> Enum.map(fn paragraph -> ("<p>" <> paragraph <> "</p>\n") end)
            |> Enum.join("")
            end
          end))
      |> File.close()
  end)
