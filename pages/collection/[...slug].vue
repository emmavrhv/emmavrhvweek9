<template>
  <div class="pr-5">
    <Drawer />
  </div>

  <div class="container mb-20 mt-10 animate-fade animate-once animate-delay-[500ms]">
    <ContentQuery :path="$route.path" find="one" v-slot="{ data }">

      <!-- Render the title of the Markdown file -->
      <h1 class="text-3xl md:text-3xl lg:text-6xl lg:mb-10 font-bold">{{ data.title }}</h1>

      <!-- Render the description of the Markdown file -->
      <p class="text-lg md:text-2xl lg:text-xl pb-10 font-bold">{{ data.description }}</p>

      <!-- Render the content using ContentRenderer -->
      <ContentRenderer :value="data" />
      <div class="text-xs leading-3">
      <hr> 
      <p class="text-xs opacity-50 hover:opacity-100">Last update: {{ formatDate(data.date) }}
      </p>
      <article v-if="data.tags">
        <li v-for="(item, index) in data.tags" :key="index" class="pt-2 text-xs opacity-50 hover:opacity-100">
          <NuxtLink :to="`/tags/${item}`">{{ item }}</NuxtLink>
        </li>
      </article>
    </div>
    </ContentQuery>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from '#app';

// Get the current route
const route = useRoute();
const actualPath = route.path.replace(/\/$/, '');

// Function to format the date
function formatDate(date) {
  const options = { year: 'numeric', month: 'long' };
  return new Date(date).toLocaleDateString(undefined, options);
}
</script>
