<script>
  import { onMount } from "svelte";
  import ContactForm from "./components/ContactForm.svelte";
  import ContactList from "./components/ContactList.svelte";
  import Header from "./components/Header.svelte";
  import { fetchContacts } from "./context/ContactContext";

  // Fetch contacts on component mount
  onMount(() => {
    fetchContacts();
  });
</script>


<Header></Header>
<div class="main-container">
  <ContactForm />
  <ContactList />
</div>
