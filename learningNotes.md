<!-- CATATAN CODE -->

# FUNGSI getPosition

function getPosition() {
return new Promise(function (resolve, reject) {
navigator.geolocation.getCurrentPosition(resolve, reject);
});
} ```

Deskripsi:

- Kode ini awalnya membuat Promise. Fungsi ini mengembalikan sebuah Promise yang akan mengembalikan nilai fullfield atau rejected. Promise adalah sebuah objek di JavaScript yang digunakan untuk menangani operasi asinkron seperti mengambil data dari API atau berinteraksi dengan fitur-fitur browser.

- Mengakses Geolokasi Pengguna: Fungsi ini menggunakan navigator.geolocation.getCurrentPosition untuk meminta lokasi geografis pengguna. Jika browser berhasil mendapatkan lokasi, maka resolve akan dipanggil dengan informasi tersebut. Jika gagal (misalnya karena pengguna menolak memberikan izin), reject akan dipanggil.

- Mengembalikan Hasil: Ketika getPosition dipanggil, fungsi ini akan menunggu hingga lokasi pengguna berhasil didapatkan, kemudian akan mengembalikan informasi lokasi tersebut.
