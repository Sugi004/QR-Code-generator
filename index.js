let url;

function generateQr() {
  // Get the values from the input

  let data = document.getElementById("data").value;
  let width = document.getElementById("width").value;
  let height = document.getElementById("height").value;
  let color = document.getElementById("qrcolor").value.slice(1);
  let bgcolor = document.getElementById("bgcolor").value.slice(1);

  if (data) {
    // Checking if the data is present or not
    let img = document.getElementById("img");

    url = `https://api.qrserver.com/v1/create-qr-code/?data=${data}&size=${width}x${height}&color=${color}&bgcolor=${bgcolor}`;
    img.src = url;
  } else {
    alert("Data field shouldn't be empty");
    img.src = " ";
    document.getElementById("qrcolor").value = "#000000";
    document.getElementById("bgcolor").value = "#FFFFFF";
    document.getElementById("width").value = " "
    document.getElementById("height").value = " ";
  }
}

function downloadQr() {
  let format = document.getElementById("format").value;
  if (url) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // Create an Object URL for the blob
        const blobUrl = window.URL.createObjectURL(blob);

        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;

        // Set the download attribute with the desired filename
        if (format === "svg") {
          downloadLink.download = "qrcode.svg";
        } else if (format === "jpg") {
          downloadLink.download = "qrcode.jpg";
        } else if (format === "png") {
          downloadLink.download = "qrcode.png";
        }

        downloadLink.click();

        window.URL.revokeObjectURL(blobUrl);
      });
  } else {
    alert("Generate QR Code to Download");
  }
}
