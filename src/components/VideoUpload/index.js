import VideoUpload from './src/index.vue'

VideoUpload.install = (vue) => {
  vue.component(VideoUpload.name, VideoUpload)
}

export default VideoUpload
