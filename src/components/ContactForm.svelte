<script>
  import {
    currentContact,
    handleAddContact,
    handleUpdateContact,
  } from "../context/ContactContext";
  import getInitialContactState from "../utils/helper";

  let contactDetails = getInitialContactState();

  // Reactively update contactDetails when currentContact changes
  $: if ($currentContact) {
    contactDetails = { ...$currentContact };
  } else {
    contactDetails = getInitialContactState();
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      contactDetails = {
        ...contactDetails,
        address: { ...contactDetails.address, [addressField]: value },
      };
    } else {
      contactDetails = { ...contactDetails, [name]: value };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (contactDetails._id) {
      await handleUpdateContact(contactDetails._id, contactDetails);
    } else {
      await handleAddContact(contactDetails);
    }
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
  };

  function resetForm() {
    contactDetails = getInitialContactState();
    currentContact.set(null);
  }
</script>

<form on:submit={handleSubmit}>
  <div class="form-row">
    <fieldset class="form-column">
      <legend>Contact Details</legend>
      <input
        type="text"
        name="firstName"
        bind:value={contactDetails.firstName}
        on:input={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="lastName"
        bind:value={contactDetails.lastName}
        on:input={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        name="email"
        bind:value={contactDetails.email}
        on:input={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="tel"
        name="phoneNumber"
        bind:value={contactDetails.phoneNumber}
        on:input={handleChange}
        placeholder="Phone Number"
        required
      />
    </fieldset>

    <fieldset class="form-column">
      <legend>Address</legend>
      <input
        type="text"
        name="address.street"
        bind:value={contactDetails.address.street}
        on:input={handleChange}
        placeholder="Street"
      />
      <input
        type="text"
        name="address.city"
        bind:value={contactDetails.address.city}
        on:input={handleChange}
        placeholder="City"
      />
      <input
        type="text"
        name="address.state"
        bind:value={contactDetails.address.state}
        on:input={handleChange}
        placeholder="State"
      />
      <input
        type="text"
        name="address.zipCode"
        bind:value={contactDetails.address.zipCode}
        on:input={handleChange}
        placeholder="Zip Code"
      />
      <input
        type="text"
        name="address.country"
        bind:value={contactDetails.address.country}
        on:input={handleChange}
        placeholder="Country"
      />
    </fieldset>
  </div>
  <button type="submit">Submit</button>
  {#if $currentContact}
    <button type="button" on:click={handleCancel}>Cancel</button>
  {/if}
</form>
