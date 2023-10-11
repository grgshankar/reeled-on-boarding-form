// helper functions

function createOrUpdateUni(_this, _url, _method) {
  const formData1 = new FormData(_this);
  var formDataObject1 = {};
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

  console.log("fdd", formDataObject1);
  $.ajax({
    url: _url,
    method: _method,
    contentType: "application/x-www-form-urlencoded",
    dataType: "json",
    data: formDataObject1,
    success: function (response) {
      console.log("res", response);

      $(".reeled-board").removeClass("active");
      $("#boarding-form-2").addClass("active");
      if (!edit_mode()) {
        set_id_to_localstorage(storageKey, response.data._id);
        set_notification_if_has_data();
        alert("Successfully Saved");
      } else {
        alert("Successfully Updated");
      }
    },
    error: function (xhr, textStatus, errorThrown) {
      console.error("Request failed with status:", textStatus);
      console.error("Error details:", xhr.responseText);
    },
  });
}

var bucketArray = [{ bucket_name: "", bucket_areas: "", bucket_brief: "" }];
function loadBucketFrom(_data = []) {
  if (_data.length > 0) {
    bucketArray = _data;
  }
  let _html = "";
  for (let i = 0; i < bucketArray.length; i++) {
    let _close_btn_html =
      i > 0
        ? '<button class="btn_remove_more" id="' +
          i +
          '" type="button"><img src="./images/wh-close.png" /></button>'
        : "";
    _html += `
    <div class="bucketList">
      <h2>Bucket ${i + 1} </h2>
      ${_close_btn_html}
        <div class="formField">
          <input
            type="text"
            name="bucket_name[]"
            placeholder="Bucket Name"
            autocomplete="off"
            value="${bucketArray[i].bucket_name}"
          />
        </div>
        <div class="formField">
          <input
            type="text"
            name="bucket_areas[]"
            placeholder="Bucket Page or Website Areas"
            autocomplete="off"
            value="${bucketArray[i].bucket_areas}"
          />
        </div>
        <div class="formField fullwidth">
          <textarea
            name="bucket_brief[]"
            placeholder="Additional Buckets Brief:"
            autocomplete="off"
          >${bucketArray[i].bucket_brief}</textarea>
        </div>
      </div>`;
  }

  $("#bucket_list_wrapper").html(_html);
}

function set_form_one_data(data) {
  $('input[name="uni_name"]').val(data.uni_name);
  $('input[name="contact_name"]').val(data.contact_name);
  $('input[name="website_url"]').val(data.website_url);
  $('input[name="email"]').val(data.email);
  $('input[name="staging_url"]').val(data.staging_url);
  $('input[name="technical_contact_name"]').val(data.technical_contact_name);
  $('input[name="technical_contact_email"]').val(data.technical_contact_email);
}

function loadFormOneData() {
  if (edit_mode()) {
    get_data_from_api(
      get_id_from_localStorage("user_id"),
      function (responseData) {
        // Handle the response data here
        let data = {
          uni_name: responseData.data.form_one.uni_name,
          contact_name: responseData.data.form_one.contact_name,
          website_url: responseData.data.form_one.website_url,
          email: responseData.data.form_one.email,
          staging_url: responseData.data.form_one.staging_url,
          technical_contact_name:
            responseData.data.form_one.technical_contact_name,
          technical_contact_email:
            responseData.data.form_one.technical_contact_email,
        };
        set_form_one_data(data);

        loadBucketFrom(responseData.data.form_one.buckets);
      }
    );
  } else {
    let data = [];
    loadBucketFrom(data);
  }
}

function initListeners() {
  $(document).on("click", "#add_more_bucket", function () {
    bucketArray = [];
    let bucket_name = $('input[name="bucket_name[]"]');
    let bucket_areas = $('input[name="bucket_areas[]"]');
    let bucket_brief = $('textarea[name="bucket_brief[]"]');

    for (let i = 0; i < bucket_name.length; i++) {
      let bucketObj = {
        bucket_name: $(bucket_name[i]).val(),
        bucket_areas: $(bucket_areas[i]).val(),
        bucket_brief: $(bucket_brief[i]).val(),
      };
      bucketArray.push(bucketObj);
    }
    bucketArray.push({ bucket_name: "", bucket_areas: "", bucket_brief: "" }); // adding empty form
    loadBucketFrom([]);
  });

  $(document).on("click", ".btn_remove_more", function () {
    let _index = $(this).attr("id");
    bucketArray.splice(_index, 1);
    loadBucketFrom();
  });

  $("#form1").submit(function (e) {
    e.preventDefault();
    if (edit_mode()) {
      let _id = get_id_from_localStorage("user_id");
      createOrUpdateUni(
        this,
        "http://localhost:3000/api/v1/universities/form-one/" + _id,
        "PUT"
      );
    } else {
      createOrUpdateUni(
        this,
        "http://localhost:3000/api/v1/universities/register",
        "POST"
      );
    }
  });
}

$(document).ready(function () {
  initListeners();
  loadFormOneData();
});
