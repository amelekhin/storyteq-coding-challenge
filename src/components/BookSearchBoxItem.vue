<script setup lang="ts">
import type { BookEntity } from '@/stores/books';

defineProps<{ item: BookEntity }>();
</script>

<template>
  <div class="bookSearchBoxItem">
    <div class="title">{{ item.title }}</div>
    <div class="author">{{ item.author }}</div>
  </div>
</template>

<style scoped>
.bookSearchBoxItem {
  padding: 0.25rem;
}

.title {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.author {
  font-size: var(--font-size-small);
}
</style>
