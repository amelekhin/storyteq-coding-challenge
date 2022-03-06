<script setup lang="ts">
import { ref } from 'vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import IconClear from '@/components/icons/IconClear.vue';

defineProps<{
  value: string;
  placeholder: string;
  isActive: boolean;
}>();

defineEmits<{
  (e: 'input', value: string): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);
defineExpose({ inputRef });
</script>

<template>
  <div :class="['searchBoxInput', { active: isActive }]">
    <div class="searchIcon">
      <IconSearch />
    </div>

    <input
      ref="inputRef"
      type="text"
      id="input"
      class="input"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', ($event.target as HTMLInputElement).value)"
    />

    <button type="button" class="clearBtn" v-if="isActive" @click.capture="$emit('input', '')">
      <IconClear />
    </button>
  </div>
</template>

<style scoped>
.searchBoxInput {
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 0.25rem;
  padding-left: 1rem;
  background-color: #fff;
  border: 1px solid rgb(223, 223, 223);
  overflow: hidden;
  transition: box-shadow 300ms ease-in-out;
}

.searchBoxInput:hover,
.searchBoxInput.active {
  box-shadow: var(--box-shadow-base);
}

.input {
  flex-grow: 1;
  background-color: transparent;
  border: 0px;
  outline: none;
  height: 3.5rem;
  margin-left: 1rem;
  font-size: var(--font-size-small);
}

.input::placeholder {
  color: var(--text-color-placeholder);
}

.searchIcon {
  width: 1.5rem;
  height: 1.5rem;
  color: rgb(100, 116, 139);
}

.clearBtn {
  position: absolute;
  width: 2rem;
  height: 2rem;
  top: 0;
  bottom: 0;
  right: 1rem;
  margin: auto;
  padding: 0.375rem;
  background-color: transparent;
  border: 0px;
  cursor: pointer;
  color: var(--text-color-placeholder);
}
</style>
