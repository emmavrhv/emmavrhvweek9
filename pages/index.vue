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
    <div v-else class="relative">
      <!-- Background container -->
      <div class="relative h-screen">
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
    
  <!-- Scrollable content with three columns -->
   <div class="relative bg-red text-#ff0000 p-10">
     <div class="container mx-auto">
        <h2 class="text-5xl font-bold mb-6">About Me</h2>
        <p class="text-lg mb-4">
          Ik ben Emma Verhoeven, een 19-jarige studente Media & Information Design aan LUCA School of Arts in Brussel. Mijn passie ligt bij grafisch ontwerp en typografie, waarbij ik altijd op zoek ben naar de perfecte balans tussen esthetiek en functionaliteit.
          Met mijn werk streef ik ernaar om sterke visuele verhalen te creëren die zowel inspireren als communiceren.
       </p>
          <p class="text-2xl playfair-display font-bold play mb-10">
            Skills:
         </p>
    
    <!-- Grid layout for three columns -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Column 1 -->
      <div class="text-red p-6">
        <h3 class="text-lg playfair-display"> Adobe Illustrator </h3>
        <p class="text-lg playfair-display"> 
          Touchdesigner
        </p>
      </div>

      <!-- Column 2 -->
      <div class="text-red playfair-display p-6">
        <h3 class="text-lg playfair-display">Adobe Indesign</h3>
        <p class="text-lg playfair-display">
          Adobe XD
        </p>
      </div>

      <!-- Column 3 -->
      <div class="text-red playfair-display p-6">
        <h3 class="text-lg playfair-display">Adobe Photoshop</h3>
        <p class="text-lg ">
          Visual studio code 
        </p>
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
  filter: blur(100px);
  color: rgba(250, 250, 250, 0.855);
  opacity: 0;
  z-index: -1; /* Ensure blur is behind the text */
}
</style>
