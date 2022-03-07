<script setup lang="ts">
import { computed, ref } from 'vue';
import handleClickOutside from '@/util/handleClickOutside';
import SearchInput from '@/components/SearchBox/SearchInput.vue';
import { debounce } from '@/util/debounce';

const MIN_SEARCH_LENGTH = 3;
const DEBOUNCE_SEARCH_MS = 150;

// Uses `unknown` because Vue Composition API doesn't support generic-typed components yet.
// But in the end SearchBox doesn't care about the exact type.
// The only downside of this approach is the explicit type casting when using slots.
const props = defineProps<{
  data: Array<unknown>;
  getKey?(dataItem: unknown): string;
  placeholder?: string;
}>();

const rootRef = ref<HTMLElement | null>(null);
const inputRef = ref<InstanceType<typeof SearchInput> | null>(null);

const isActive = ref(false);

const searchValue = ref('');

const updateSearchValue = debounce((nextValue: string) => {
  searchValue.value = nextValue;
}, DEBOUNCE_SEARCH_MS);

const hasSearchValue = computed(() => searchValue.value.length >= MIN_SEARCH_LENGTH);

const getItemKey = props.getKey ?? String;

const filteredData = computed(() => {
  if (!hasSearchValue.value) {
    return [];
  }

  return props.data
    .filter(dataItem =>
      getItemKey(dataItem)
        .trim()
        .toLowerCase()
        .includes(searchValue.value),
    )
    .sort();
});

const hasResults = computed(() => filteredData.value.length > 0);

const handleBlur = () => {
  isActive.value = false;
};

const handleFocus = () => {
  isActive.value = true;

  if (rootRef.value) {
    handleClickOutside(rootRef.value, handleBlur);
  }

  if (inputRef.value?.inputRef) {
    inputRef.value.inputRef.focus();
  }
};

const handleItemClick = (dataItem: unknown) => {
  window.alert(`You picked: ${JSON.stringify(dataItem)}`);
};

defineExpose({
  focus: handleFocus,
});
</script>

<template>
  <div class="searchBox" ref="rootRef" @click="handleFocus()">
    <SearchInput
      ref="inputRef"
      :placeholder="placeholder || ''"
      :value="searchValue"
      :is-active="isActive"
      @input="updateSearchValue"
      data-test="searchInput"
    />

    <Transition name="slide">
      <div class="resultList" v-if="isActive" data-test="resultList">
        <div
          class="resultListItem"
          v-for="dataItem in filteredData"
          :key="getItemKey(dataItem)"
          @click="handleItemClick(dataItem)"
          data-test="resultListItem"
        >
          <slot :item="dataItem">{{ String(dataItem) }}</slot>
        </div>

        <div class="resultListPlaceholder" v-if="!hasResults" data-test="resultListPlaceholder">
          <span v-if="hasSearchValue">No results found</span>
          <span v-else>Type at least 3 letters...</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.searchBox {
  width: 100%;
  position: relative;
  user-select: none;
}

.resultList {
  width: 100%;
  position: absolute;
  top: 100%;
  margin-top: 0.5rem;
  background-color: #fff;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 0.25rem;
  box-shadow: var(--box-shadow-base);
  padding: 0.5rem;
}

.resultListItem {
  border-radius: 0.25rem;
  padding: 0.5rem;
  cursor: pointer;
}

.resultListItem:hover {
  background-color: #eee;
}

.resultListPlaceholder {
  padding: 0.5rem;
  color: var(--text-color-placeholder);
}

.slide-enter-active,
.slide-leave-active {
  transform: translateY(0);
  transition: 150ms ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-0.25rem);
}
</style>
