//decalring key name in the localStorage
const storageKey = "user_id";

//setting the ID in localStorage
function set_id_to_localstorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
}

function remove_locaStorage(key) {
  localStorage.removeItem(key);
}

//getting ID from localStorage
function get_id_from_localStorage(key) {
  const value = localStorage.getItem(key);
  if (value !== null && value !== undefined) {
    return JSON.parse(value);
  }
  return false;
}
// checking the current as well as upcoming localStorage data
function current_user_session() {
  const id = get_id_from_localStorage(storageKey);
  if (id) {
    get_data_from_api(id);
  }
}

//check whether the form isin edit mode or not
function edit_mode() {
  return get_id_from_localStorage(storageKey);
}

function set_notification_if_has_data() {
  $(".notification").html(
    " <div class='container'><p>Are you interested in ending your current session and starting a fresh one ?? <a href='javascript:void(0);' class='new-form'>Click Here</a></p></div>"
  );
  $(document).on("click", ".new-form", function (e) {
    e.preventDefault();
    remove_locaStorage(storageKey);
    alert("Existing Data cleared and prepared new form.");
    window.location.reload();
  });
}

if (edit_mode()) {
  set_notification_if_has_data();
}
// this is global_storage.js

// getting data from api by the help of ID

function get_data_from_api(_id, successCallback) {
  $.ajax({
    url: "http://localhost:3000/api/v1/universities/" + _id,
    method: "GET",
    contentType: "application/x-www-form-urlencoded", // or 'multipart/form-data' if needed
    dataType: "json", // Specify the expected data type (JSON in this case)
    success: function (response) {
      // Call the successCallback function with the response data
      successCallback(response);
    },
    error: function (xhr, textStatus, errorThrown) {
      console.error("Request failed with status:", textStatus);
    },
  });
}
