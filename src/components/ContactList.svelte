<script>
  import { onMount } from 'svelte';
  import ContactItem from './ContactItem.svelte';
  import { contacts } from '../context/ContactContext';

  let visibleCount = 10;
  let observer;
  let sentinel;

  onMount(() => {
    observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (entry.isIntersecting && $contacts.length > visibleCount) {
        visibleCount += 10;
      }
    }, { threshold: 1.0 });

    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  });

  $: {
    if (observer && sentinel) {
      observer.observe(sentinel);
    }
  }
</script>

<div class="contact-list">
  {#each $contacts.slice(0, visibleCount) as contact (contact._id)}
    <ContactItem {contact} />
  {/each}
  {#if $contacts.length > visibleCount}
    <div bind:this={sentinel}></div>
  {/if}
</div>
