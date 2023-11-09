<template>
  <button :disabled="disabled" @click="onClick" class="pagination-button font-semibold">
    <slot></slot> 
  </button>
</template>

<script>
export default {
  name: 'PaginationButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    // Accept a click handler via props
    onClick: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.onClick();
      }
    }
  }
};
</script>

<style scoped>
.pagination-button {
  padding: 10px 20px;
  margin: 5px;
  background-color: var(--fc-green-dark); 
  border: 1px solid var(--fc-green-dark);
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s; 
  cursor: pointer;
  border-radius: 4px;
}

.pagination-button:hover {
  background-color: white;
  color: var(--fc-green-dark); 
  border: 1px solid var(--fc-green-dark);
}

.pagination-button:disabled {
  background-color: var(--fc-gray-3);
  color: var(--fc-gray-4);
  cursor: not-allowed;
  border: 1px solid var(--fc-gray-3);
}
.pagination-button:disabled:hover {
  border: 1px solid #cccccc;
}
</style>
