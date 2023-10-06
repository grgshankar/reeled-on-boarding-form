var $ = jQuery;

const nextFormFn = () => {
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
};
// just for the localStorage
let bucketCounter = 1;
const bucketAutoFormLoad = () => {
  $(window).on("load", function () {
    const _firstLoadhtml = `
    <div class="bucketList">
      <h2>Bucket ${bucketCounter}</h2>
        <div class="formField">
          <input
            type="text"
            name="bucket_name[]"
            placeholder="Bucket Name"
            autocomplete="off"
          />
        </div>
        <div class="formField">
          <input
            type="text"
            name="bucket_areas[]"
            placeholder="Bucket Page or Website Areas"
            autocomplete="off"
          />
        </div>
        <div class="formField fullwidth">
          <textarea
            name="bucket_brief[]"
            placeholder="Additional Buckets Brief:"
            autocomplete="off"
          ></textarea>
        </div>
      </div>`;
    $("#bucket_list_wrapper").append(_firstLoadhtml);
    updateBucketNumbers();
  });
};
const updateBucketNumbers = () => {
  $("#bucket_list_wrapper .bucketList h2 ").each(function (index) {
    $(this).text(`Bucket ${index + 1}`);
  });
};
const addMoreBucket = () => {
  const addBucket = $("#add_more_bucket");
  const bucketContainer = $("#bucket_list_wrapper");

  // Handle the click event on the 'Add new bucket' button
  addBucket.off("click").on("click", function () {
    const _html = `
    <div class="bucketList">
      <h2>Bucket ${bucketCounter}</h2>
      <button id="btn_remove_more" type="button"><img src="./images/wh-close.png" /></button>
        <div class="formField">
          <input
            type="text"
            name="bucket_name[]"
            placeholder="Bucket Name"
            autocomplete="off"
          />
        </div>
        <div class="formField">
          <input
            type="text"
            name="bucket_areas[]"
            placeholder="Bucket Page or Website Areas"
            autocomplete="off"
          />
        </div>
        <div class="formField fullwidth">
          <textarea
            name="bucket_brief[]"
            placeholder="Additional Buckets Brief:"
            autocomplete="off"
          ></textarea>
        </div>
      </div>`;
    bucketContainer.append(_html);
    bucketCounter++; // Increment the counter
    updateBucketNumbers();
  });
};
const removeBucket = () => {
  $("#bucket_list_wrapper").on("click", "#btn_remove_more", function () {
    // console.log("Remove button clicked");
    $(this).closest(".bucketList").remove();
    bucketCounter--;
    updateBucketNumbers();
  });
};
const ajaxFormFn = () => {
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

  //getting ID from localStorage
  function get_id_from_localStorage(hey) {
    const value = localStorage.getItem(hey);
    if (value !== null && value !== undefined) {
      return JSON.parse(value);
    }
    return false;
  }

  current_user_session();

  // getting data from api by the help of ID
  function get_data_from_api(_id) {
    $.ajax({
      url: "http://localhost:3000/api/v1/universities/" + _id,
      method: "GET",
      contentType: "application/x-www-form-urlencoded", // or 'multipart/form-data' if needed
      dataType: "json", // Specify the expected data type (JSON in this case)
      success: function (response) {
        $('input[name="uni_name"]').val(response.data.uni_name);
        $('input[name="contact_name"]').val(response.data.contact_name);
        $('input[name="website_url"]').val(response.data.website_url);
        $('input[name="email"]').val(response.data.email);
        $('input[name="staging_url"]').val(response.data.staging_url);
        $('input[name="technical_contact_name"]').val(
          response.data.technical_contact_name
        );
        $('input[name="technical_contact_email"]').val(
          response.data.technical_contact_email
        );
        // Display bucket list data
        const buckets = response.data.buckets;
        buckets.forEach(function (bucket, index) {
          const bucketItemHtml = `
          <div class="bucketList">
            <h2>Bucket ${index + 1}</h2>
            <div class="formField">
              <input type="text" name="bucket_name[]" placeholder="Bucket Name" autocomplete="off" value="${
                bucket.bucket_name
              }" />
            </div>
            <div class="formField">
              <input type="text" name="bucket_areas[]" placeholder="Bucket Page or Website Areas" autocomplete="off" value="${
                bucket.bucket_areas
              }" />
            </div>
            <div class="formField fullwidth">
              <textarea name="bucket_brief[]" placeholder="Additional Buckets Brief:" autocomplete="off">${
                bucket.bucket_brief
              }</textarea>
            </div>
          </div>`;

          $("#bucket_list_wrapper").append(bucketItemHtml);
        });
      },
      error: function (xhr, textStatus, errorThrown) {
        console.error("Request failed with status:", textStatus);
      },
    });
  }

  // checking the current as well as upcoming localStorage data
  function current_user_session() {
    const id = get_id_from_localStorage(storageKey);
    if (id) {
      get_data_from_api(id);
    }
  }
  // new account ajax
  $("#myForm").submit(function (e) {
    e.preventDefault();
    // Get the form data
    const formData = new FormData(this);
    console.log("formData", formData);
    var formDataObject = {};
    // Iterate over form data entries
    for (const [key, value] of formData.entries()) {
      if (formDataObject[key]) {
        if (Array.isArray(formDataObject[key])) {
          formDataObject[key].push(value);
        } else {
          formDataObject[key] = [formDataObject[key], value];
        }
      } else {
        formDataObject[key] = value;
      }
    }

    // Make an AJAX GET request to the API using jQuery
    $.ajax({
      url: "http://localhost:3000/api/v1/universities/register",
      method: "POST",
      contentType: "application/x-www-form-urlencoded", // or 'multipart/form-data' if needed
      dataType: "json", // Specify the expected data type (JSON in this case)
      data: formDataObject,
      success: function (response) {
        set_id_to_localstorage(storageKey, response.data._id);
        alert("Successfully Saved");
      },
      error: function (xhr, textStatus, errorThrown) {
        console.error("Request failed with status:", textStatus);
      },
    });
  });
};

const hybridForm = () => {
  $('input[name="install"]').change(function () {
    if ($(this).val() === "Hybrid Install") {
      $("#hybrid_form").addClass("active");
    } else {
      $("#hybrid_form").removeClass("active");
    }
  });
};

//adding more user
let userCounter = 2;
const addUserForm = () => {
  const addMoreUser = $("#add_more_user");
  const userContainer = $("#user_list_wrapper");
  addMoreUser.off("click").on("click", function () {
    const _userHtml = `<div class="usersList">
    <button id="btn_remove_more" type="button"><img src="./images/wh-close.png" /></button>
    <h2>User ${userCounter}</h2>
        <div class="formField">
            <input type="text" name="" value="" placeholder="Full Name" />
        </div>
        <div class="formField">
            <input type="text" name="" value="" placeholder="Job Role" />
        </div>
        <div class="formField">
            <input type="email" name="" value="" placeholder="Email" />
        </div>
        <div class="formField">
            <select name="">
                <option value="User Level">User Level</option>
                <option value="User Level 1">User Level 1</option>
                <option value="User Level 2">User Level 2</option>
                <option value="User Level 3">User Level 3</option>
                <option value="User Level 4">User Level 4</option>
            </select>
        </div>
    </div>`;
    userContainer.append(_userHtml);
    userCounter++;
  });
};

const removeUserForm = () => {
  $("#user_list_wrapper").on("click", "#btn_remove_more", function () {
    // console.log("Remove button clicked");
    $(this).closest(".usersList").remove();
    userCounter--;
  });
};

$(document).ready(function () {
  // bucketAutoFormLoad();
  // nextFormFn();
  ajaxFormFn();
  addMoreBucket();
  removeBucket();
  hybridForm();
  addUserForm();
  removeUserForm();
  // if (typeof jQuery === "undefined") {
  //   console.error("jQuery is not loaded.");
  // }
});
