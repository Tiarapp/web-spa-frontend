# React + Vite

## Build deployment

Setiap push ke `main` menjalankan GitHub Actions untuk membangun frontend dengan
API `https://admin.saranapackaging.com` dan menyimpan hasilnya di branch
`deploy-build`. Workflow juga dapat dijalankan secara manual dari tab Actions.
Repository harus mengizinkan GitHub Actions menulis isi repository. Branch ini
hanya berisi hasil build; jangan menyimpan perubahan manual di sana.

Di hosting Rumahweb, Cron Job memeriksa branch tersebut setiap 10 menit dan
memasang build yang berubah. Log tersimpan di
`~/sarana-frontend-deploy.log`. Pembaruan konten dari dashboard Laravel tidak
memerlukan build frontend; deployment backend diatur secara terpisah.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
