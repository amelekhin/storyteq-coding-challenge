import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBox from './SearchBox.vue';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

describe('SearchBox', () => {
  it('renders properly', () => {
    const data: string[] = [];
    const wrapper = mount(SearchBox, { props: { data, placeholder: 'Test' } });

    expect(wrapper.find('[data-test=searchInput]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test=searchInput] input').exists()).toBeTruthy();
    expect(wrapper.find('[data-test=searchInput] input').exists()).toBeTruthy();
    expect(wrapper.find('[data-test=searchInput] input').attributes().placeholder).toEqual('Test');

    expect(wrapper.find('[data-test=resultList]').exists()).toBeFalsy();
    expect(wrapper.find('[data-test=resultListPlaceholder]').exists()).toBeFalsy();
  });

  it('activates by a click and shows the results list', async () => {
    const data: string[] = [];
    const wrapper = mount(SearchBox, { props: { data, placeholder: 'Test' } });

    await wrapper.trigger('click');

    expect(wrapper.find('[data-test=resultList]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test=resultListPlaceholder]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test=resultListPlaceholder]').text()).toBe('Type at least 3 letters...');
  });

  it('renders the results that match the search', async () => {
    const data = ['san andreas', 'san francisco', 'san jose'];
    const wrapper = mount(SearchBox, { props: { data, placeholder: 'Search cities' } });

    await wrapper.trigger('click');

    expect(wrapper.find('[data-test=resultList]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test=resultListPlaceholder]').exists()).toBeTruthy();

    wrapper.find('[data-test=searchInput] input').setValue('san');

    // Wait for debounced input handling
    await delay(200);

    expect(wrapper.find('[data-test=resultListPlaceholder]').exists()).toBeFalsy();
    expect(wrapper.find('[data-test=resultList]').exists()).toBeTruthy();

    expect(wrapper.findAll('[data-test=resultListItem]').length).toBe(3);
    expect(wrapper.findAll('[data-test=resultListItem]').at(0)?.text()).toBe('san andreas');
    expect(wrapper.findAll('[data-test=resultListItem]').at(1)?.text()).toBe('san francisco');
    expect(wrapper.findAll('[data-test=resultListItem]').at(2)?.text()).toBe('san jose');
  });

  it('renders a placeholder if there are no results', async () => {
    const data = ['san andreas', 'san francisco', 'san jose'];
    const wrapper = mount(SearchBox, { props: { data, placeholder: 'Search cities' } });

    await wrapper.trigger('click');

    expect(wrapper.find('[data-test=resultList]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test=resultListPlaceholder]').exists()).toBeTruthy();

    wrapper.find('[data-test=searchInput] input').setValue('jack');

    // Wait for debounced input handling
    await delay(200);

    expect(wrapper.findAll('[data-test=resultListItem]').length).toBe(0);

    expect(wrapper.find('[data-test=resultListPlaceholder]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test=resultListPlaceholder]').text()).toBe('No results found');
  });

  it('renders a placeholder if there are no results', async () => {
    const data = ['san andreas', 'san francisco', 'san jose'];
    const wrapper = mount(SearchBox, { props: { data, placeholder: 'Search cities' } });

    await wrapper.trigger('click');

    expect(wrapper.find('[data-test=resultList]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test=resultListPlaceholder]').exists()).toBeTruthy();

    wrapper.find('[data-test=searchInput] input').setValue('jack');

    // Wait for debounced input handling
    await delay(200);

    expect(wrapper.findAll('[data-test=resultListItem]').length).toBe(0);

    expect(wrapper.find('[data-test=resultListPlaceholder]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test=resultListPlaceholder]').text()).toBe('No results found');
  });

  it('renders a placeholder if there are no results', async () => {
    const data = ['san andreas', 'san francisco', 'san jose'];
    const wrapper = mount(SearchBox, { props: { data, placeholder: 'Search cities' } });

    await wrapper.trigger('click');

    expect(wrapper.find('[data-test=resultList]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test=resultListPlaceholder]').exists()).toBeTruthy();

    wrapper.find('[data-test=searchInput] input').setValue('jack');

    // Wait for debounced input handling
    await delay(200);

    expect(wrapper.findAll('[data-test=resultListItem]').length).toBe(0);

    expect(wrapper.find('[data-test=resultListPlaceholder]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test=resultListPlaceholder]').text()).toBe('No results found');
  });
});
