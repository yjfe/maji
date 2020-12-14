import ImgUpload from './src/index.vue'

ImgUpload.install = (vue) => {
  vue.component(ImgUpload.name, ImgUpload)
}

export default ImgUpload
