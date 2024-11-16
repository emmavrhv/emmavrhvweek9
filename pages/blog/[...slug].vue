<template>

  <div class="mb-20 animate-fade animate-once animate-delay-[500ms]">


    <ContentQuery :path="$route.path" find="one" v-slot="{ data }">

      <!-- Display the layout based on the selected value -->

      <!-- -->
      <!-- START First Layout -->
      <div v-if="data.layoutblog == 'layout1'" class="layout1">
        <div class="pr-5 z-100">
          <Drawer />
        </div>
        <div class="container">
          <!-- Render the title of the Markdown file -->
          <h1 class="text-3xl md:text-3xl lg:text-6xl lg:mb-10 font-bold">{{ data.title }} </h1>
          <!-- Render the description of the Markdown file -->
          <p class="text-lg md:text-2xl lg:text-xl pb-10 font-bold">{{ data.description }}</p>
          <ContentRenderer :value="data" />
          <!-- Tags section -->
          <div class="text-xs leading-3 container">
            <hr>
            <p class="text-xs opacity-50 hover:opacity-100">Last update: {{ formatDate(data.date) }}</p>
            <article v-if="data.tags">
            <ul class="flex flex-wrap gap-2">
              <li v-for="(item, index) in data.tags" :key="index" class="text-xs opacity-50 hover:opacity-100">
                <NuxtLink :to="`/tags/${item}`" class="inline-block">
                  {{ item }}
                </NuxtLink>
              </li>
            </ul>
          </article>
          </div>
        </div>
      </div>
      <!-- END First Layout -->
      <!-- -->
      <!-- START Second Layout -->
      <div v-if="data.layoutblog == 'layout2'" class="layout2">

        <div class="static">
          <div class="absolute top-0 right-0 z-10 pr-5">
            <Drawer />
          </div>
          <div class="relative z-1">
            <NuxtImg
              v-if="data.thumbnail"
              :src="data.thumbnail"
              class="w-screen opacity-80"
              :alt="`Thumbnail for ${data.title}`"
              format="webp"
            />
            <div class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 ">
              <div class="w-1/2">
                <div class="">
                  <h1 class="text-white text-4xl md:text-6xl lg:text-8xl font-bold">{{ data.title }}</h1>
                </div>
                <div class="text-white">
                  <article v-if="data.tags">
                    <li v-for="(item, index) in data.tags" :key="index" class="pt-2 text-lg md:text-xl lg:text-2xl  opacity-50 hover:opacity-100">
                      <NuxtLink :to="`/tags/${item}`">{{ item }}</NuxtLink>
                    </li>
                  </article>
                  
                  <p class="text-white text-xs opacity-50 hover:opacity-100">Last update: {{ formatDate(data.date) }}</p>
                </div>
              </div>
            </div>
            <ShareButtons />
          </div>
        </div>

        <main class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 container">
          <div class="p-4">
            <div class="text-xs leading-3 container">
              <hr>
              <p class="text-xs opacity-50 hover:opacity-100">Last update: {{ formatDate(data.date) }}</p>
              <article v-if="data.tags" class="pb-10">
                <li v-for="(item, index) in data.tags" :key="index" class="pt-2 text-xs opacity-50 hover:opacity-100">
                  <NuxtLink :to="`/tags/${item}`">{{ item }}</NuxtLink>
                </li>
              </article>
            </div>
            <p class="text-lg md:text-2xl lg:text-xl pb-10 font-bold">{{ data.description }}</p>
              <ImageGallery />
          </div>
          <div class="p-4">
            <ContentRenderer :value="data" />
          </div>
        </main>
      </div>
      <!-- END Second Layout -->
      <!-- -->

      <!-- START Third Layout -->
      <div v-if="data.layoutblog == 'layout3'" class="">
        <div class="pr-5 z-100">
          <Drawer />
        </div>
        <div class="container">
          <div class="flex justify-between">
            <div class="p-4">
              <!-- Render the title of the Markdown file -->
              <h1 class="text-4xl md:text-6xl lg:text-7xl lg:mb-10 font-bold">{{ data.title }} </h1>
              <!-- Render the description of the Markdown file -->
              <p class="text-lg md:text-2xl lg:text-xl pb-10 font-bold">{{ data.description }}</p>
                  <ImageGallery />
              <!-- Tags section -->
              <div class="text-xs leading-3 container">
                <hr>
                <p class="text-xs opacity-50 hover:opacity-100">Last update: {{ formatDate(data.date) }}</p>
                <article v-if="data.tags">
                  <li v-for="(item, index) in data.tags" :key="index" class="pt-2 text-xs opacity-50 hover:opacity-100">
                    <NuxtLink :to="`/tags/${item}`">{{ item }}</NuxtLink>
                  </li>
                </article>
                <ShareButtons />
              </div>        
            </div>
            <div class="p-4">
              <ContentRenderer :value="data" />
            </div>
          </div>
        </div>
      </div>
      <!-- END Third Layout -->
    </ContentQuery>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from '#app';

// Get the current route
const route = useRoute();
const actualPath = route.path.replace(/\/$/, '');

// Layout selection state
const layout = ref('grid'); // Default layout is grid

// Function to format the date
function formatDate(date) {
  const options = { year: 'numeric', month: 'long' };
  return new Date(date).toLocaleDateString(undefined, options);
}
</script>

<style scoped>
/* Example styles for different layouts */
.layout1 {}

.grid-item {
  background: #f4f4f4;
  padding: 1rem;
}

.layout2 ul {
  list-style: none;
  padding: 0;
}

.layout3 {
  column-count: 2;
}

.masonry-item {
  background: #f4f4f4;
  padding: 1rem;
  break-inside: avoid;
}

/* Drawer transparency style */
.pr-5 > .Drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

li { 
list-style: none;
display: inline-block;
padding-right: 4px;
}
</style>
