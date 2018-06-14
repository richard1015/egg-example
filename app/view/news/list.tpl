<html>
  <head>
    <title>科技资讯</title>
    {# <link rel="stylesheet" href="/public/css/news.css" /> #}
  </head>
  <body>
    {{ list }}
    <ul class="news-view view">
      {% for item in list %}
        <li class="item">
          <a href="{{ item.url }}">{{ item.title }}</a>
        </li>
      {% endfor %}
    </ul>
  </body>
</html>