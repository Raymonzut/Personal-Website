# Templates will be filled by posts
index_template = File.read!("./templates/post_index_page.html")
post_template = File.read!("./templates/post_single_page.html")

post_feed_item_template = File.read!("./templates/post_item.xml")
post_feed_template = File.read!("./templates/posts.xml")

# Converting handlebars in template to values
fill_template = fn template, pairs ->
  Regex.compile!("{{(.*)}}") |>
  Regex.replace(template, fn _, key -> if key != "content" do Map.get(pairs, String.to_atom(key)) else
    Map.get(pairs, String.to_atom(key))
    # Converting \n to paragraphs
    |> String.split("\\n")
    |> Enum.reject(fn(x) -> x == "" end)
    |> Enum.map(fn paragraph -> ("<p>" <> paragraph <> "</p>\n") end)
    |> Enum.join("")
    end
  end)
end

fill_template_pretemplated = fn template -> &fill_template.(template, &1) end

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

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
index_file = post_contents
  |> Enum.sort_by(fn m -> Map.get(m, :date) |> (fn d -> Enum.find_index(months, &(&1 == String.slice(d, 8..10))) end).() end)
  |> Enum.reverse()
  # Group by month
  |> Enum.group_by(fn m -> Map.get(m, :date) |> String.slice(8..15) end)
  |> Enum.sort_by(fn {d, _c} -> (length months) * elem(Integer.parse(String.slice(d, 4..7)), 0)
                                                + Enum.find_index(months, &(&1 == String.slice(d, 0..2))) end)
  |> Enum.reverse()
  |> Enum.map(fn {month, posts} -> "\n<h1>" <> month <> "</h1>\n" <> (posts |>
      Enum.map(fn post -> "<h2>" <> (Map.get(post, :date) |> String.slice(0..6)) <>
                        " - <a href=\"" <> Map.get(post, :id) <> ".html\">" <> Map.get(post, :title) <> "</a></h2>"
      end) |> Enum.join("\n")) end) 
  |> Enum.join("\n")
  |> (fn v -> %{index: v} end).()
  |> fill_template_pretemplated.(index_template).()

File.open!("./public/gen/index.html", [:write])
  |> IO.binwrite(index_file)
  |> File.close()

post_contents
  |> Enum.each(fn post ->
      File.open!("./public/gen/" <> Map.get(post, :id) <> ".html", [:write])
      |> IO.binwrite(fill_template.(post_template, post))
      |> File.close()
  end)

post_feed = post_contents
  |> Enum.sort_by(fn m -> Map.get(m, :date) end)
  |> Enum.reverse()
  |> Enum.map(fill_template_pretemplated.(post_feed_item_template))
  |> Enum.join("\n")
  |> (fn v -> %{items: v} end).()
  |> fill_template_pretemplated.(post_feed_template).()

File.open!("./public/gen/rss.xml", [:write])
  |> IO.binwrite(post_feed)
  |> File.close()
