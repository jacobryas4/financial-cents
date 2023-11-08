<template>
  <div class="dropdown">
    <select @change="handleChange" :value="modelValue" class="dropdown-select">
      <slot></slot> <!-- This is where the dropdown options will be inserted -->
    </select>
  </div>
</template>

<script>
export default {
  name: 'DropdownSelect',
  props: {
    modelValue: {
      type: [String, Number], // can be either a string or number depending on your value types
      default: ''
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleChange(event) {
      // Emit the 'input' event to update the v-model in the parent
      // ensure that the value is a number
      this.$emit('update:modelValue', Number(event.target.value));
    }
  }
};
</script>

<style scoped>
.dropdown {
  /* Styles for the dropdown container */
  position: relative;
  display: inline-block;
  margin: 0 10px; /* Adjust spacing to match your layout */
}

.dropdown-select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}
</style>
