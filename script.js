function getCryptoRandomNumbers(min, max, length) {
  const arr = new Uint16Array(length);
  const nums = crypto.getRandomValues(arr);
  return nums.map(
    (num) => ((num - 0) * (max - min)) / (Math.pow(2, 16) - 0) + min
  );
}

function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

function getRandomLength(minStr, maxStr) {
  const min = Number(minStr);
  const max = Number(maxStr);
  if (!isFinite(min) || !isFinite(max)) {
    throw new Errror("bad min or max!");
  }
  console.log({ min, max });
  return getCryptoRandomNumbers(min, max, 1)[0];
}

function getCharacterSet() {
  return [...range(" ".charCodeAt(0), "~".charCodeAt(0))].reduce(
    (memo, num) => memo + String.fromCharCode(num),
    ""
  );
}

function generate(event) {
  event.preventDefault();

  const form = document.forms.form;
  const formData = new FormData(form);
  const min = formData.get("length-min");
  const max = formData.get("length-max");
  const length = getRandomLength(min, max);
  console.log(length);
  const chars = getCharacterSet();
  const pw = getCryptoRandomNumbers(0, chars.length, length).reduce(
    (memo, charIdx) => memo + chars[charIdx],
    ""
  );
  console.log(pw);
  form.pw.value = pw;
  form.pw.select();
}
