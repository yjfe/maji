import ImgGroupUpload from './src/index.vue'

ImgGroupUpload.install = (vue) => {
  vue.component(ImgGroupUpload.name, ImgGroupUpload)
}

export default ImgGroupUpload
