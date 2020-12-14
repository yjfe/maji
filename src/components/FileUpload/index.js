import FileUpload from './src/index.vue'

FileUpload.install = (vue) => {
  vue.component(FileUpload.name, FileUpload)
}

export default FileUpload
