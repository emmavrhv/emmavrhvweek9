<template>
  <div class="flex animate-fade animate-once animate-delay-[500ms]">
    <div class="flex-auto w-1 pt-3"></div>
    <div class="flex-row pt-5 justify-end">
      <button style="margin-left: 16px" @click="drawer = true" class="bg-white dark:bg-slate-900 bg-opacity-20 hover:bg-opacity-90 dark:bg-opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M4.5 17.27q-.213 0-.356-.145T4 16.768t.144-.356t.356-.143h15q.213 0 .356.144q.144.144.144.357t-.144.356t-.356.143zm0-4.77q-.213 0-.356-.144T4 11.999t.144-.356t.356-.143h15q.213 0 .356.144t.144.357t-.144.356t-.356.143zm0-4.77q-.213 0-.356-.143Q4 7.443 4 7.23t.144-.356t.356-.143h15q.213 0 .356.144T20 7.23t-.144.356t-.356.144z"></path>
        </svg>
      </button>
    </div>
  </div>

  <el-drawer
    v-model="drawer"
    class="drawer min-w-fit max-w-screen"
    :direction="direction"
    :custom-class="'fixed-drawer'"
  >
    <!-- Drawer content -->
    <div class="flex flex-col h-full">
      <div>
        <Titleblock />
      </div>
      <div class="flex-1 overflow-auto">
        <Navigations />
      </div>

      <!-- Footer is placed at the bottom of the drawer -->
      <div class="mt-auto footer">
        <Footer />
        <UtilNav />
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { DrawerProps } from 'element-plus'
const drawer = ref(false)
const direction = ref<DrawerProps['direction']>('rtl') // Right-to-left direction
</script>

<style>
.fixed-drawer {
  position: fixed;
  top: 0;
  right: 0; /* Set drawer to the right */
  width: 300px; /* Customize width if needed */
  height: 100%;
  z-index: 1000; /* Ensures it appears on top */
  background-color: #ff0000;
}

.flex-row {
  display: flex;
  justify-content: flex-end; /* Button aligned to end (right) */
}

.flex-row button {
  align-self: flex-start; /* Align the button at the top */
}

.mt-auto {
  margin-top: auto;
}
</style>

<style>
.el-drawer  { background-color: rgba(206, 8, 8, 0.99);}
.el-drawer {color: azure;}
.dark-mode .el-drawer { color: #f3eded;}
.gray-mode .el-drawer { background-color: black;  color: #f3eded;}
</style>
