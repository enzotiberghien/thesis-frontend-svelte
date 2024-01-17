<script>
  import { handleSetCurrentContact, handleDeleteContact } from '../context/ContactContext';

  export let contact;

  const handleEdit = () => {
    handleSetCurrentContact(contact);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this contact?")) {
      handleDeleteContact(contact._id);
      handleSetCurrentContact(null)
    }
  };
</script>

<div class="contact-item">
  <div class="contact-details">
    <div class="contact-name">{contact.firstName} {contact.lastName}</div>
    <div class="contact-email">Email: {contact.email}</div>
    <div class="contact-phone">Phone: {contact.phoneNumber}</div>
    {#if contact.address}
      <div class="contact-address">
        <div>Street: {contact.address.street}</div>
        <div>City: {contact.address.city}</div>
        <div>State: {contact.address.state}</div>
        <div>Zip: {contact.address.zipCode}</div>
        <div>Country: {contact.address.country}</div>
      </div>
    {/if}
  </div>
  <button on:click={handleEdit}>Edit</button>
  <button on:click={handleDelete}>Delete</button>
</div>