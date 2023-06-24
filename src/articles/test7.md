---
title: 'Testing7'
date: '2023-03-03'
---

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page. <br>

**Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.<br>

**Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.<br>

<ul class="list-disc" style="padding-left: 20px;">
<li>1</li>
<li>2</li>
<li>3</li>
</ul>

<br>

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.
