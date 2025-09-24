<template>
  <GoogleMap :api-key="apiKey" style="width: 100%; height: 500px" :center="mapCenter" :zoom="mapZoom">
    <CustomControl position="TOP_RIGHT">
      <div class="control-group">
        <button class="g-map-control-button" @click="goToShopLocation" title="Locate Shop">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" stroke="#222" stroke-width="2" fill="#fff" />
            <circle cx="12" cy="12" r="3" fill="#222" />
            <line x1="12" y1="2" x2="12" y2="6" stroke="#222" stroke-width="2" />
            <line x1="12" y1="18" x2="12" y2="22" stroke="#222" stroke-width="2" />
            <line x1="2" y1="12" x2="6" y2="12" stroke="#222" stroke-width="2" />
            <line x1="18" y1="12" x2="22" y2="12" stroke="#222" stroke-width="2" />
          </svg>
        </button>
        <!-- <button class="g-map-control-button" @click="goToCurrentLocation" title="我的位置">
          <svg
            class="g-map-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
          </svg>
        </button> -->

        <button class="g-map-control-button" @click="startNavigation" title="Directions">
          <svg
            class="g-map-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
          </svg>
        </button>
      </div>
    </CustomControl>
    <Marker :options="{ position: mapCenter, label: 'Cloudloom' }" />
    <!-- <CustomMarker :options="{ position: mapCenter, anchorPoint: 'BOTTOM_CENTER' }">
      <div style="text-align: center">
        <div style="font-size: 1.125rem">Cloudloom</div>
        <img src="/images/logo/logo2.png" width="30" height="30" style="margin-top: 8px" />
      </div>
    </CustomMarker> -->
  </GoogleMap>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import { GoogleMap, CustomMarker, Marker, CustomControl } from 'vue3-google-map';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const mapCenter = ref({
  lat: 53.349805,
  lng: -6.26031,
});
const mapZoom = ref(15);

function goToShopLocation() {
  mapCenter.value = { ...mapCenter.value };
  mapZoom.value = 15;
}

function goToCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        mapCenter.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        mapZoom.value = 15;
      },
      error => {
        console.error('Geolocation error:', error);
      }
    );
  }
}

function startNavigation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const origin = `${position.coords.latitude},${position.coords.longitude}`;
        const destination = `${mapCenter.value.lat},${mapCenter.value.lng}`;
        const navUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
        window.open(navUrl, '_blank');
      },
      error => {
        toast.error('Unable to retrieve your location for navigation.');
      }
    );
  }
}
</script>

<style scoped>
.control-group {
  display: flex;
  flex-direction: column;
  margin-top: 10px; /* 顶部外边距 */
  margin-right: 10px; /* 右侧外边距 */
}
.g-map-control-button {
  background-color: #fff;
  border: 0;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  height: 40px;
  width: 40px;
  margin-bottom: 5px; /* 按钮之间的垂直间距 */
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.g-map-control-button:hover {
  background-color: #f5f5f5;
}

.g-map-icon {
  color: #5f6368;
}

.g-map-icon:hover {
  color: #3c4043;
}

/* 调整导航按钮的位置，使其在定位按钮的上方 */
.nav-button-style {
  margin-bottom: 5px; /* 调整间距 */
}
</style>
