var notify, params, parseQueryString, queryString;

parseQueryString = function(queryString) {
  var params, q, queries, temp, _i, _len;
  if (queryString == null) {
    queryString = "";
  }
  params = {};
  queries = queryString.split("&");
  for (_i = 0, _len = queries.length; _i < _len; _i++) {
    q = queries[_i];
    temp = q.split('=');
    params[temp[0]] = temp[1];
  }
  return params;
};

notify = function(msg, klass) {
  var note;
  $('#top-note').remove();
  note = $("<div id=\"top-note\" class=\"alert alert-" + klass + "\"><span class=\"msg\">" + msg + "</span></div>");
  return note.prependTo($("body"));
};

if ($(".contact.page").size() > 0) {
  $(".contact.page .contact-form").on("submit", function(e) {
    var entities, entry, obj, payload, _i, _len;
    e.preventDefault();
    entities = $(e.target).serializeArray();
    obj = {};
    for (_i = 0, _len = entities.length; _i < _len; _i++) {
      entry = entities[_i];
      obj[entry["name"]] = entry["value"];
    }
    obj["name"] = obj["firstName"] + " " + obj["lastName"];
    payload = JSON.stringify(obj);
    $.ajax({
      url: 'https://looppulse-contact.firebaseio.com/.json',
      type: 'POST',
      data: payload,
      dataType: "json",
      success: function(data) {
        if (data.name) {
          return window.location = "index.html?contact_form_submit=SUCCESS";
        } else {
          return notify("Failed to send the contact form. Please retry later", "error");
        }
      },
      error: function(data) {
        return notify("Failed to send the contact form. Please retry later", "error");
      }
    });
    return false;
  });
  $(".contact.page select").each(function() {
    var select, txt;
    select = $(this);
    txt = select.attr("title");
    return select.selectBoxIt({
      theme: "bootstrap",
      defaultText: txt
    });
  });
  $(".contact.page .required label").each(function() {
    return $(this).attr("title", "This field is required.");
  }).tooltip({
    'placement': 'auto right'
  });
}

if ($("main.index").size() > 0) {
  queryString = window.location.search;
  queryString = queryString.substring(1);
  params = parseQueryString(queryString);
  if ((params != null ? params.contact_form_submit : void 0) === "SUCCESS") {
    notify("Thanks for the message. Our team will get back to you shortly.", "success");
  }
}
