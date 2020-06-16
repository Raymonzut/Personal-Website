import { age } from "./lib/me.mjs"

const age_span = document.getElementById("age")
age_span.textContent = age().toString()
