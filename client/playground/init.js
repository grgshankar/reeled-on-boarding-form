var $ = jQuery;
$(document).ready(function () {
  $(".navWrap .boarding-next").click(function () {
    // alert("hi");
    var data_id = $(this).attr("data-id");
    $(".reeled-board").removeClass("active");
    $("#" + data_id).addClass("active");
  });

  $(".navWrap .boarding-prev").click(function () {
    // alert("hi");
    var data_id = $(this).attr("data-id");
    $(".reeled-board").removeClass("active");
    $("#" + data_id).addClass("active");
  });

  const storageKey = "user_id";
  // Function to retrieve a value from local storage
  function get_id_from_localstorage(key) {
    const value = localStorage.getItem(key);
    if (value !== null && value !== undefined) {
      return JSON.parse(value);
    }
    return false;
  }

  // Function to set a value in local storage
  function set_id_to_localstorage(key, value) {
    try {
      // Stringify the value and store it in local storage
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Handle any errors that may occur during storage
      console.error("Error storing value in local storage:", error);
    }
  }

  // Function to delete a value from local storage
  function delete_id_to_localstorage(key) {
    try {
      // Remove the value associated with the key from local storage
      localStorage.removeItem(key);
    } catch (error) {
      // Handle any errors that may occur during removal
      console.error("Error deleting value from local storage:", error);
    }
  }

  checkCurrentUserSession();

  function set_notification_if_has_data() {
    $(".notification").html(
      " <p>New Form ?? <a href='javascript:void(0);' class='new-form'>Click Here</a></p>"
    );
    $(document).on("click", ".new-form", function (e) {
      e.preventDefault();
      delete_id_to_localstorage(storageKey);
      alert("Existing Data cleared and prepared new form.");
      window.location.reload();
    });
  }

  function get_and_set_data_from_api(_id) {
    $.ajax({
      url: "http://localhost:3000/api/v1/universities/" + _id,
      method: "GET",
      contentType: "application/x-www-form-urlencoded", // or 'multipart/form-data' if needed
      dataType: "json", // Specify the expected data type (JSON in this case)
      //   data: {
      //     id: _id,
      //   },
      success: function (response) {
        console.log("details", response);
        $('input[name="uni_name"]').val(response.data.uni_name);
        $('input[name="contact_name"]').val(response.data.contact_name);
        $('input[name="website_url"]').val(response.data.website_url);
      },
      error: function (xhr, textStatus, errorThrown) {
        console.error("Request failed with status:", textStatus);
      },
    });
  }

  function checkCurrentUserSession() {
    let _id = get_id_from_localstorage(storageKey);
    if (_id) {
      set_notification_if_has_data();
      get_and_set_data_from_api(_id);
    }
  }

  // new account ajax
  $("#myForm").submit(function (e) {
    e.preventDefault();
    // Get the form data
    const formData = {
      uni_name: $('input[name="uni_name"]').val(),
      //   logo: $('input[name="logo"]').val(),
      contact_name: $('input[name="contact_name"]').val(),
      website_url: $('input[name="website_url"]').val(),
      email: $('input[name="email"]').val(),
      technical_contact_name: $('input[name="technical_contact_name"]').val(),
      technical_contact_email: $('input[name="technical_contact_email"]').val(),
      buckets: [
        {
          bucket_name: $('input[name="bucket_name"]').val(),
          bucket_areas: $('input[name="bucket_areas"]').val(),
          bucket_brief: $('textarea[name="bucket_brief"]').val(),
        },
      ],
    };

    // const apiUrl = "https://api.example.com/data";

    // Make an AJAX GET request to the API using jQuery
    $.ajax({
      url: "http://localhost:3000/api/v1/universities/register",
      method: "POST",
      contentType: "application/x-www-form-urlencoded", // or 'multipart/form-data' if needed
      dataType: "json", // Specify the expected data type (JSON in this case)
      data: formData,
      success: function (response) {
        // Handle the JSON data from the API
        set_id_to_localstorage(storageKey, response.data._id);
        console.log("body_data", response.data._id);
        alert("Successfully Saved");
      },
      error: function (xhr, textStatus, errorThrown) {
        console.error("Request failed with status:", textStatus);
      },
    });
  });
});

// just for the localStorage
const addMoreBucket = () => {
  const addBucket = $("#add_more_bucket");
  const bucketContainer = $("#bucket_list_wrapper");

  // Handle the click event on the 'Add new bucket' button
  addBucket.off("click").on("click", function () {
    var cloneDiv = $(".bucketList:first").clone();
    cloneDiv.find("input[type=text], textarea").val("");
    bucketContainer.append(cloneDiv);
    updateAndStoreFormData();
  });
};

const uni_formFn = () => {
  // new account ajax
  const local_uni_exist = () => {
    const uni_data = localStorage.getItem("uni_data");
    if (uni_data) {
      const parsedUniData = JSON.parse(uni_data);
      $('input[name="uni_name"]').val(parsedUniData.uni_name);
      $('input[name="contact_name"]').val(parsedUniData.contact_name);
      $('input[name="website_url"]').val(parsedUniData.website_url);
      $('input[name="email"]').val(parsedUniData.email);
      $('input[name="technical_contact_name"]').val(
        parsedUniData.technical_contact_name
      );
      $('input[name="technical_contact_email"]').val(
        parsedUniData.technical_contact_email
      );
      $('input[name="bucket_name"]').val(parsedUniData.bucket_name);
      $('input[name="bucket_areas"]').val(parsedUniData.bucket_areas);
      $('textarea[name="bucket_brief"]').val(parsedUniData.bucket_brief);
    }
  };
  local_uni_exist();

  $("#myForm").submit(function (e) {
    e.preventDefault();

    //update and store the form data in localStorage
    updateAndStoreFormData();

    //submitting the form data to server
    this.submit();
  });
};
const updateAndStoreFormData = () => {
  var formData = [];
  var formFields = $("#myForm").serializeArray();
  formFields.forEach(function (field) {
    formData.push({ [field.name]: [field.value] });
  });

  const bucketListData = [];
  $("#bucket_list_wrapper .bucketList").each(function (index) {
    var bucketFields = $(this).find('input[type="text"], textarea').val();

    var bucketItem = {};
    $(this)
      .find('input[type="text"], textarea')
      .each(function () {
        bucketItem[$(this).attr("name")] = $(this).val();
      });
    bucketListData.push(bucketItem);
  });
  formData.push({ bucketList: bucketListData });
  //store the data in localStorage
  localStorage.setItem("uni_data", JSON.stringify(formData));
};
