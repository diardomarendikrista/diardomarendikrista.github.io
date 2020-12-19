//initializing everythings.... (puyeng sendiri pak bacanya. wkwkkw)

///////////////// untuk menentukan tingkat kesulitan, ngambil dari URL GET \\\\\\\\\\\\\\\\\\\\\\\\\
// Get Nav URL
function getNavUrl() {
  // Get URL
  return window.location.search.replace("?", "");
}
//ambil URL diatas
function getParameters(url) {
  // Params obj
  var params = {};
  // To lowercase
  url = url.toLowerCase();
  // To array
  url = url.split("&");

  // Iterate over URL parameters array
  var length = url.length;
  for (var i = 0; i < length; i++) {
    // Create prop
    var prop = url[i].slice(0, url[i].search("="));
    // Create Val
    var value = url[i].slice(url[i].search("=")).replace("=", "");
    // Params New Attr
    params[prop] = value;
  }
  return params;
}
//console.log(getParameters(getNavUrl()));

//set tingkat kesulitan
let kesulitan = getParameters(getNavUrl()).difficulty;
//console.log(kesulitan);

//////////////////////// end of ngecek tingkat kesulitan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//////////////////////// set berdasar tingkat kesyulitan \\\\\\\\\\\\\\\\\\\\\
let waktu = 25;
let pelanggan = 8;
let nyawa = 3;
let pembelian = 100000;
let pembayaran = 150000;

if (kesulitan === "easy") {
  //status
  waktu = 60;
  pelanggan = 3;
  //kesulitan soal
  pembelian = 10000;
  pembayaran = 50000;
} else if (kesulitan === "normal") {
  waktu = 30;
  pelanggan = 5;
  //kesulitan soal
  pembelian = 105000;
  pembayaran = 150000;
} else if (kesulitan === "hard") {
  waktu = 15;
  pelanggan = 10;
  //kesulitan soal
  pembelian = 1005500;
  pembayaran = 270000;
}
//////////////////////// end of set tingkat kesulitan \\\\\\\\\\\\\\\\\\\\\

//initializing status
let timeLeft = waktu;
let suratPeringatan = 0;
let soundTick = 0;
let soundKaching = 0;

//panggil soal tiap refresh
soal();

//ini untuk generate soal
function soal() {
  let randHarga = Math.random() * 10;
  let harga = Math.ceil(randHarga.toFixed(2) * pembelian);
  harga % 2 !== 0 ? (harga -= 1) : "";

  let randNama = Math.ceil(Math.random() * 10);
  let nama = [
    "Pak Budi",
    "Bu Jeffry",
    "Mang Oleh",
    "Paijo",
    "Si Bambang",
    "Bu Lukan",
    "Bang Sat-ria",
    "Pak Budi",
    "Pak Harto",
    "Bu Mega",
    "Mas Cahyadi",
  ];

  let bayar = 0;
  let flagBayar = false;
  while (!flagBayar) {
    if (bayar <= harga) {
      bayar += pembayaran;
    } else {
      flagBayar = true;
    }
  }

  let exchange = bayar - harga;
  document.getElementById("rhs").innerHTML = exchange;

  const soal = `
    ${nama[randNama]} membeli beberapa barang dengan total Rp. ${new Number(
    harga
  ).toLocaleString("id-ID")} <br/>
    <br/>
    ${nama[randNama]} membayar dengan uang Rp. ${new Number(
    bayar
  ).toLocaleString("id-ID")}<br/>
  `;

  document.getElementById("soal").innerHTML = soal;
  return exchange;
}

//mengosongkan inputan kembalian
function clearKembalian() {
  let elements = document.getElementsByTagName("input");
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].type == "number") {
      elements[i].value = "";
    }
  }
}

//ketika klik gambar uang
function nambahUang(uang) {
  document.getElementById(uang).value++;
  playTick();
}

//efek suara ditekan, supaya bisa ditekan terus & ga ke-skip audionya.
function playTick() {
  if (soundTick === 0) {
    document.getElementById("soundTick").play();
    soundTick++;
  } else if (soundTick === 1) {
    document.getElementById("soundTick2").play();
    soundTick++;
  } else if (soundTick === 2) {
    document.getElementById("soundTick3").play();
    soundTick++;
  } else if (soundTick === 3) {
    document.getElementById("soundTick4").play();
    soundTick++;
  } else if (soundTick >= 4) {
    document.getElementById("soundTick5").play();
    soundTick = 0;
  }
}

//tadinya mau pake ini , tapi kurang puas hasil suaranya XD
// function playTick() {
//   document.getElementById("soundTick5").currentTime = 0;
//   document.getElementById("soundTick5").play();
// }

//efek suara betul, supaya kalau betul terus & ga ke-skip audionya.
function playCorrect() {
  if (soundKaching === 0) {
    document.getElementById("soundCorrect").play();
    soundKaching++;
  } else if (soundKaching === 1) {
    document.getElementById("soundCorrect2").play();
    soundKaching++;
  } else if (soundKaching === 2) {
    document.getElementById("soundCorrect3").play();
    soundKaching++;
  } else if (soundKaching === 3) {
    document.getElementById("soundCorrect4").play();
    soundKaching++;
  } else if (soundKaching >= 4) {
    document.getElementById("soundCorrect5").play();
    soundKaching = 0;
  }
}

//realtime status update (maaf buat yg pake PC kentang kalo script yang ini bikin berat , nge-refresh per 10ms)
let realTime = setInterval(function () {
  //data uang - oh god ternyata object ngebantu banget :'D
  let uang = {
    seratusRibu: document.getElementById("seratusRibu").value * 100000,
    limapuluhRibu: document.getElementById("limapuluhRibu").value * 50000,
    sepuluhRibu: document.getElementById("sepuluhRibu").value * 10000,
    duapuluhRibu: document.getElementById("duapuluhRibu").value * 20000,
    limaRibu: document.getElementById("limaRibu").value * 5000,
    duaRibu: document.getElementById("duaRibu").value * 2000,
    seRibu: document.getElementById("seRibu").value * 1000,
    limaRatus: document.getElementById("limaRatus").value * 500,
    seRatus: document.getElementById("seRatus").value * 100,
    limaPuluh: document.getElementById("limaPuluh").value * 50,
    sePuluh: document.getElementById("sePuluh").value * 10,
    satu: document.getElementById("satu").value * 1,
  };
  let totalUang = 0;
  for (const key in uang) {
    totalUang += uang[key];
  }

  document.getElementById("kembalian").value = totalUang;

  //Set data nyawa & antrian
  const urlNyawa = `<img src="../img/lope.png">`;
  const urlPelanggan = `<img src="../img/man.png">`;
  let gambarNyawa = ``;
  let gambarAntrian = ``;
  for (let i = 0; i < nyawa; i++) {
    gambarNyawa += urlNyawa;
  }
  for (let i = 0; i < pelanggan; i++) {
    gambarAntrian += urlPelanggan;
  }
  document.getElementById("nyawa").innerHTML = gambarNyawa;
  document.getElementById("pelanggan").innerHTML = gambarAntrian;
  document.getElementById("countdowntimer").innerHTML = timeLeft;
}, 10);

/////////////// ini timer kampret nya \\\\\\\\\\\\\\\\\\\
let downloadTimer = setInterval(function () {
  timeLeft--;
  if (timeLeft <= 0) {
    document.getElementById("soundWrong").play();
    nyawa--;
    suratPeringatan++;
    timeLeft = waktu;
    clearKembalian();
    soal();
    alert(
      `Terlalu lambat!\nantrian sudah panjang dan pelanggan sudah komplain!\n anda mendapat Surat Peringatan ${suratPeringatan}`
    );
    if (nyawa <= 0) {
      kalah("terlalu lelet kerjanya");
    }
  }
  //warna countdown jadi merah kalau kurang dari 10 detick
  if (timeLeft <= 10 && timeLeft >= 0) {
    document.getElementById("cdtimer").setAttribute("class", "red");
  } else {
    document.getElementById("cdtimer").setAttribute("class", "black");
  }
  //nge - clear message
  if (timeLeft <= waktu - 3) {
    document.getElementById("message").innerHTML = ``;
    document.getElementById("message").setAttribute("class", "black");
  }
}, 1000);

//ini cek jawaban (ketika tombol beri kembalian ditekan)
function jawab() {
  let jawaban = document.getElementById("kembalian").value;
  exchange = Number(document.getElementById("rhs").innerHTML);
  jawaban = Number(jawaban);

  clearKembalian();

  if (!jawaban) {
    // kalau kotak jawaban kosong, maka :
    document.getElementById("message").setAttribute("class", "red bold");
    document.getElementById(
      "message"
    ).innerHTML = `Isi kembaliannya! (tekan uangnya)`;
  } else if (jawaban === exchange) {
    // kalau jawaban benar, maka :
    playCorrect();
    document.getElementById("message").setAttribute("class", "green bold");
    document.getElementById(
      "message"
    ).innerHTML = `ANDA BENAR, pelanggan selanjutnya..`;
    pelanggan--;
    timeLeft = waktu;
    if (pelanggan <= 0) {
      menang();
    }
    soal();
  } else {
    // kalau jawaban salah, maka :
    document.getElementById("soundWrong").play();
    let salah = "";
    nyawa--;
    suratPeringatan++;
    timeLeft = waktu;
    // menentukan pesan di box
    if (jawaban > exchange) {
      salah = `KEMBALIAN TERLALU BANYAK!\nANDA MERUGIKAN PERUSAHAAN!\nanda mendapat Surat Peringatan ${suratPeringatan}`;
    } else if (jawaban < exchange) {
      salah = `KEMBALIAN KURANG!\nPENGUNJUNG KOMPLAIN BERAT!\nanda mendapat Surat Peringatan ${suratPeringatan}`;
    }
    alert(salah);
    soal();
    if (nyawa <= 0) {
      kalah("Kamu gak becus kerja");
    }
  }
}

function stopTimer() {
  clearInterval(downloadTimer);
}

function gohome() {
  window.location.href = "index.html";
}

function cit() {
  exchange = document.getElementById("rhs").innerHTML;
  document.getElementById("kembalian").value = exchange;
  jawab();
  console.log(exchange);
}

function kalah(alasan) {
  document.getElementById("nyawa").innerHTML = nyawa;
  document.getElementById("pelanggan").innerHTML = pelanggan;
  stopTimer();
  alert(`Anda DIPECAT!\n${alasan}\nSilahkan kembali pengangguran`);
  gohome();
}

function menang() {
  document.getElementById("soundLvl").play();
  stopTimer();
  alert(
    `SELAMAT ANDA BERHASIL!!!\nAnda dipromosikan menjadi Manager\nTidak perlu hitung2 lagi..`
  );
  gohome();
}

function giveUp() {
  let answer = window.confirm("Yakin menyerah?");
  if (answer) {
    gohome();
  } else {
    soal();
  }
}
