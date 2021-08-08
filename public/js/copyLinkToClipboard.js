function copyLinkToClipboard() {
    var copyText = document.getElementById("copyLink");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("Copied the link: " + copyText.value);
}