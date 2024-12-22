<script setup>
import { ref, onMounted } from 'vue';
const router = useRouter();

const homepageSettings = ref(null); // For homepage.json data
const generalSettings = ref(null); // For settings.json data

const isLoading = ref(true); // Loading state
const hasError = ref(false); // Error state

const title = ref(""); // Title
const subtitle = ref(""); // Subtitle
const copyright = ref(""); // Copyright

onMounted(async () => {
  try {
    // Fetch homepage.json
    const homepageResponse = await fetch('/_data/homepage.json');
    if (!homepageResponse.ok) {
      throw new Error(`Homepage settings error! status: ${homepageResponse.status}`);
    }
    const homepageData = await homepageResponse.json();
    homepageSettings.value = homepageData;

    // Fetch settings.json
    const settingsResponse = await fetch('/_data/settings.json');
    if (!settingsResponse.ok) {
      throw new Error(`General settings error! status: ${settingsResponse.status}`);
    }
    generalSettings.value = await settingsResponse.json();

    // Set title, subtitle, and copyright directly
    title.value = generalSettings.value.site_title || "";
    subtitle.value = generalSettings.value.site_subtitle || "";
    copyright.value = generalSettings.value.copyright || "";

    if (homepageSettings.value.homepageredirect == "") {
      // No redirect, load page content
    } else {
      // Redirect if homepageredirect is set
      if (homepageSettings.value.homepageredirect) {
        const redirectPath = homepageSettings.value.homepageredirect
          ? `/page/${homepageSettings.value.homepageredirect}`
          : null;

        if (redirectPath) {
          router.push(redirectPath);
        }
      }
    }

    isLoading.value = false; // Stop loading when both files are fetched
  } catch (error) {
    hasError.value = true; // Show error message if fetching fails
    console.error('Error loading settings:', error);
  }
});
</script>

<template>
  <div>
    <!-- Loading state -->
    <div v-if="isLoading" class="flex items-center playfair-display text-red justify-center h-screen">
      <div class="spinner-icon"></div> <!-- Voeg hier je icoontje toe -->
      <p class="ml-2">Loading...</p> <!-- Optioneel, kan worden verwijderd -->
    </div>

    <!-- Error state -->
    <div v-else-if="hasError" class="flex items-center justify-center h-screen">
      <p>Error loading settings. Please try again later.</p>
    </div>

    <!-- Main content -->
    <div v-else class="h-screen relative">
      <!-- Background container -->
      <div class="relative h-full">
        <!-- Background image -->
        <div
          class="absolute inset-0 bg-cover bg-center"
          :style="{ backgroundImage: homepageSettings?.thumbnail ? `url(${homepageSettings.thumbnail})` : '' }"
        ></div>

        <!-- Black overlay for opacity -->
        <div class="absolute inset-0 bg-black opacity-30"></div>

        <!-- Content above the background -->
        <div class="relative z-10 pr-5">
          <Drawer />
        </div>

        <!-- Info section -->
        <div class="info flex flex-col items-center justify-center h-screen relative">
          <div class="container text-center p-1 lg:p-20">
            <div class="container opacity-100 animate-fade animate-once animate-delay-[100ms] text-white">
              <!-- Title -->
              <div class="relative">
                <div class="homepagetitle text-6xl font-semibold animate-fade animate-once animate-delay-[750ms] ">{{ title }}</div>
                <div class="homepagetitle text-6xl font-semibold blur-background animate-fade animate-once animate-delay-[750ms] ">{{ title }}</div>
              </div>

              <!-- Subtitle -->
              <div class="relative mt-4">
                <div class="homepagetitle text-3xl animate-fade animate-once animate-delay-[1500ms] font-regular">{{ subtitle }}</div>
              </div>

              <!-- Copyright -->
              <div class="relative mt-4">
                <div class="font-light animate-fade animate-once animate-delay-[1800ms]">{{ copyright }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.homepagetitle {
  font-family: 'playfair-display';
}
 
.blur-background {
  position: absolute;
  inset: 0;
  filter: blur(3px);
  color:rgba(249, 249, 249, 0.855); 
  opacity: 0.1;
  z-index: -1; /* Ensure blur is behind the text */
}

</style>