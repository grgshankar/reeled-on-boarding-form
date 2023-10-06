var $ = jQuery;

const nextFormFn = () => {
  $(document).on("click", ".navWrap .boarding-next", function () {
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
  // console.log("ajaxformfn loaded");
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
    return true;
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
        const buttonLoadAfterData = $("#boarding-form-1 .reeledForm");
        const nextButtonWrapper = `<div class="navWrap">
                        <button type="submit" class="boarding-next" data-id="boarding-form-2">js next</button>
                    </div>`;
        if (response.data !== null && response.data !== undefined) {
          buttonLoadAfterData.append(nextButtonWrapper);
          response.data.buckets.forEach(function (bucket, index) {
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

          $("#form1 .navWrap").remove();
        } else {
          remove_locaStorage(storageKey);
          const _jsBucketList = `<div class="bucketList">
                                    <h2>Bucket 1</h2>
                                    <div class="formField">
                                        <input type="text" name="bucket_name[]" placeholder="Bucket Name"
                                            autocomplete="off" />
                                    </div>
                                    <div class="formField">
                                        <input type="text" name="bucket_areas[]"
                                            placeholder="Bucket Page or Website Areas" autocomplete="off" />
                                    </div>
                                    <div class="formField fullwidth">
                                        <textarea name="bucket_brief[]" placeholder="Additional Buckets Brief:"
                                            autocomplete="off"></textarea>
                                    </div>
                                </div>`;
          $("#bucket_list_wrapper").append(_jsBucketList);
          buttonLoadAfterData.nextButtonWrapper.remove();
        }
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
  $("#form1").submit(function (e) {
    e.preventDefault();
    // Get the form data
    // console.log("this is form 1=", $("#form1")[0]);
    const formData1 = new FormData($("#form1")[0]);
    console.log("formData", { formData1 });
    var formDataObject1 = {};
    // Iterate over form data entries
    for (const [key, value] of formData1.entries()) {
      if (formDataObject1[key]) {
        if (Array.isArray(formDataObject1[key])) {
          formDataObject1[key].push(value);
        } else {
          formDataObject1[key] = [formDataObject1[key], value];
        }
      } else {
        formDataObject1[key] = value;
      }
    }

    // Make an AJAX POST request to the API using jQuery
    $.ajax({
      url: "http://localhost:3000/api/v1/universities/register",
      method: "POST",
      contentType: "application/x-www-form-urlencoded", // or 'multipart/form-data' if needed
      dataType: "json", // Specify the expected data type (JSON in this case)
      data: formDataObject1,
      success: function (response) {
        set_id_to_localstorage(storageKey, response.data._id);
        alert("Successfully Saved");
      },
      error: function (xhr, textStatus, errorThrown) {
        console.error("Request failed with status:", textStatus);
        console.error("Error details:", xhr.responseText);
      },
    });
  });
};

//form 2 ajax
$("#form2").submit(function (e) {
  e.preventDefault();
  const formData2 = new FormData($("#form2")[0]);
  console.log("formData2", formData2);
  const formDataObject2 = {};

  for (const [key, value] of formData2.entries()) {
    if (formDataObject2[key]) {
      if (Array.isArray(formDataObject2[key])) {
        formDataObject2[key].push(value);
      } else {
        formDataObject2[key] = [formDataObject2[key], value];
      }
    } else {
      formDataObject2[key] = value;
    }
  }
  // Make an AJAX POST request to the API using jQuery
  $.ajax({
    url: "http://localhost:3000/api/v1/universities/register",
    method: "POST",
    contentType: "application/x-www-form-urlencoded", // or 'multipart/form-data' if needed
    dataType: "json", // Specify the expected data type (JSON in this case)
    data: formDataObject2,
    success: function (response) {
      set_id_to_localstorage(storageKey, response.data._id);
      alert("Successfully Saved");
    },
    error: function (xhr, textStatus, errorThrown) {
      console.error("Request failed with status:", textStatus);
      console.error("Error details:", xhr.responseText);
    },
  });
});

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
  nextFormFn();
  ajaxFormFn();
  addMoreBucket();
  removeBucket();
  hybridForm();
  addUserForm();
  removeUserForm();
});
