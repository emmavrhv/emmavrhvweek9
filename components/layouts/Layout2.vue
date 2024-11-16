<template>
  <div class="layout2">
    <div class="relative z-1">
      <NuxtImg
        v-if="data.thumbnail"
        :src="data.thumbnail"
        class="w-screen opacity-80 "
        :alt="`Thumbnail for ${data.title}`"
        format="webp"
        loading="lazy"
        @load="imageLoaded = true"
      />
      <div v-if="!imageLoaded" class="absolute min-h-screen inset-0 flex items-center justify-center bg-black bg-opacity-75">
        <div class="spinner"></div>
      </div>
      <div class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 animate-fade animate-once animate-delay-[500ms]" v-if="imageLoaded">
        <div class="w-1/2">
          <div>
            <h1 class="text-white text-4xl md:text-6xl lg:text-8xl font-bold pb-10">{{ data.title }}</h1>
          </div>
          <div class="text-white">
            <p class="text-white text-xs opacity-50 hover:opacity-100">Last update: {{ formatDate(data.date) }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Drawer -->
    <div class="absolute top-0 right-0 z-10 pr-5">
      <Drawer />
    </div>
    <!-- Main section -->
    <div class="container mx-auto p-4 animate-fade animate-once animate-delay-[500ms]" v-if="imageLoaded" >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <!-- First column -->
        <div>
          <h1 class="text-3xl md:text-3xl lg:text-6xl lg:mb-10 font-bold">{{ data.title }}</h1>
          <p class="text-lg md:text-2xl lg:text-xl pb-5 font-bold">{{ data.description }}</p>
          <div v-if="data.imagegallery">
            <ImageGallery />
          </div>
          <!-- Link and published date -->
          <div class="text-xs leading-3">
            <hr>
            <p class="text-xs opacity-50 hover:opacity-100 pb-5">Last update: {{ formatDate(data.date) }}</p>
            <article v-if="data.tags" class="tags">
              <li v-for="(item, index) in data.tags" :key="index" class="pt-2 text-xs opacity-50 hover:opacity-100">
                <NuxtLink :to="`/tags/${item}`">{{ item }}</NuxtLink>
              </li>
            </article>
          </div>
        </div>
        <!-- Second column -->
        <div>
          <ContentRenderer :value="data" />
        </div>
      </div>
    </div>
    <ShareButtons />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const imageLoaded = ref(false);

defineProps(['data', 'formatDate']);
</script>

<style scoped>
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>