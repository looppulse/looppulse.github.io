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
        return alert("Success");
      }
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
