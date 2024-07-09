# onvAlert

onvAlert adalah library JavaScript ringan untuk menampilkan pesan notifikasi yang menarik dan kustomisabel di aplikasi web Anda.

## Fitur

- Berbagai jenis notifikasi: info, sukses, error, peringatan, dan pertanyaan
- Posisi yang dapat dikustomisasi
- Durasi tampil dan sembunyi yang dapat diatur
- Opsi blur background
- Mudah diintegrasikan dan digunakan

## Instalasi

### Menggunakan CDN

Tambahkan link berikut ke bagian `<head>` dari file HTML Anda:

```html
<link rel="stylesheet" href="https://onvonic.com/cdn/library/onvAlert.css">
<script src="https://onvonic.com/cdn/library/onvAlert.js"></script>
```

## Penggunaan

Setelah menambahkan file CSS dan JavaScript, Anda dapat menggunakan onvAlert dengan cara berikut:

```javascript
onvAlert.options({
    title: "Judul Pesan",
    text: "Isi pesan Anda di sini",
    icon: "info",
    positionClass: "toast-top-right",
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000"
});
```

## Opsi

| Opsi | Tipe | Default | Deskripsi |
|------|------|---------|-----------|
| title | string | "" | Judul notifikasi |
| text | string | "" | Isi pesan notifikasi |
| icon | string | "info" | Jenis ikon ("info", "success", "error", "warning", "question") |
| closeButton | boolean | true | Menampilkan tombol tutup |
| positionClass | string | "toast-top-right" | Posisi notifikasi |
| showDuration | string | "300" | Durasi animasi munculnya notifikasi (dalam milidetik) |
| hideDuration | string | "1000" | Durasi animasi hilangnya notifikasi (dalam milidetik) |
| timeOut | string | "5000" | Waktu notifikasi ditampilkan sebelum otomatis hilang (dalam milidetik, "0" untuk tidak otomatis hilang) |
| blur | boolean | false | Mengaktifkan efek blur pada background |

## Posisi

- "toast-top-right"
- "toast-top-left"
- "toast-top-center"
- "toast-bottom-right"
- "toast-bottom-left"
- "toast-bottom-center"
- "toast-center-middle"

## Contoh

```javascript
function showSuccess() {
    onvAlert.options({
        title: "Berhasil!",
        text: "Data telah disimpan",
        icon: "success",
        positionClass: "toast-bottom-right",
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "3000"
    });
}

function showWarningWithBlur() {
    onvAlert.options({
        title: "Peringatan",
        text: "Apakah Anda yakin ingin menghapus data ini?",
        icon: "warning",
        positionClass: "toast-center-middle",
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "0",
        blur: true
    });
}
```

## Lisensi

[Masukkan informasi lisensi di sini]

## Kontak

Untuk pertanyaan atau dukungan, silakan hubungi [masukkan informasi kontak di sini].