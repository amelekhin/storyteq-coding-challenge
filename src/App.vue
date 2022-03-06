<script setup lang="ts">
import { useBooksStore } from '@/stores/books';
import { useCitiesStore } from '@/stores/cities';
import BookSearchBoxItem from '@/components/BookSearchBoxItem.vue';
import SearchBox from '@/components/SearchBox/SearchBox.vue';
import type { BookEntity } from '@/stores/books';

const citiesStore = useCitiesStore();

const booksStore = useBooksStore();
const getBookKey = (bookItem: BookEntity) => bookItem.title;
</script>

<template>
  <div class="app">
    <SearchBox :data="citiesStore.cities" placeholder="Search cities" />

    <SearchBox
      :data="booksStore.books"
      :get-key="getBookKey"
      v-slot="slotProps"
      placeholder="Search books"
    >
      <BookSearchBoxItem :item="(slotProps.item as BookEntity)" />
    </SearchBox>
  </div>
</template>

<style>
@import "./assets/base.css";
</style>

<style scoped>
.app {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  max-width: 1280px;
  min-width: 768px;
  margin: 0 auto;
}
</style>
