<template>
  <div
    class="invoice-card rounded-xl m-3 bg-fc-gray-1 shadow-lg transition duration-200 md:hover:shadow-xl"
  >
    <div
      class="card-header bg-fc-green-dark p-4 flex justify-between rounded-t-xl text-sm md:text-md lg:text-lg"
    >
      <div class="flex items-center">
        <img
          :src="user.profileImageUrl"
          :alt="`Profile image of ${user.name}`"
          class="w-12 h-12 rounded-xl me-4"
        />
        <h3 class="text-fc-gray-1 font-bold">{{ user.name }}</h3>
      </div>
      <div>
        <div class="dropdown" @click.stop="toggleDropdown($event)" tabindex="0">
          <img
            src="../assets/menu-dots.svg"
            alt="Menu"
            class="w-7 h-7 cursor-pointer hover:bg-fc-green-medium rounded-full py-1"
            :class="showDropdown ? 'bg-fc-green-medium' : ''"
          />
          <transition name="fade">
            <div
              v-show="showDropdown"
              class="dropdown-content rounded-lg"
              v-click-outside="closeDropdown"
            >
              <a @click="viewInvoice">View</a>
              <a @click="editInvoice">Edit</a>
              <a @click="deleteInvoice" class="text-fc-red-dark">Delete</a>
            </div>
          </transition>
        </div>
      </div>
      <!-- Placeholder for other header elements -->
    </div>
    <div class="card-body">
      <div class="invoice-info">
        <div class="my-3 flex justify-between text-sm md:text-md lg:text-lg text-fc-gray-5">
          Last invoice
          <span>{{ user.lastInvoiceDate }}</span>
        </div>
        <hr class="h-[2px] bg-fc-gray-2" />
        <div
          class="my-3 flex justify-between items-center text-sm md:text-md lg:text-lg"
        >
          <span class="text-fc-gray-5">Amount</span>
          <div class="flex items-center">
            {{ `$${user.amount}` }}
            <span
              :class="statusClass"
              class="self-center inline-flex rounded-full px-1 pill ms-2"
            >
              {{ user.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InvoiceCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  methods: {
    toggleDropdown(event) {
      if (this.showDropdown) {
        this.showDropdown = false;
      } else {
        this.showDropdown = true;
      }
      event.stopPropagation();
    },
    closeDropdown() {
      console.log("closeDropdown");
      this.showDropdown = false;
    },
    viewInvoice() {
      // Logic to view the invoice
      console.log("viewInvoice");
    },
    editInvoice() {
      // Logic to edit the invoice
      console.log("editInvoice");
    },
    deleteInvoice() {
      // Logic to delete the invoice
      console.log("deleteInvoice");
    },
  },
  computed: {
    formattedAmount() {
      // Assuming invoice.amount is a number
      return `$${this.user.amount}`;
    },
    statusClass() {
      return {
        overdue: this.user.status === "Overdue",
        paid: this.user.status === "Paid",
      };
    },
  },
};
</script>

<style scoped>
.invoice-card {
  /* Styles for the card */
  margin-bottom: 16px;
}

.card-header {
  /* Styles for the header */
  display: flex;
  align-items: center;
}

.profile-pic {
  /* Styles for the profile picture */
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 16px;
}

.card-body {
  /* Styles for the body */
  padding: 16px;
}

.pill {
  font-size: 10px;
  border-radius: 6px;
  line-height: 1rem;
}

.overdue {
  /* Styles for overdue status */
  color: #dd1c1a;
  background-color: var(--fc-red-light);
}

.paid {
  /* Styles for paid status TODO - lighten background color */
  color: #059669;
  background-color: var(--fc-green-light);
}

.dropdown {
  position: relative;
  display: inline-block;
}

/* Transition styles for fade effect */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.dropdown-content {
  position: absolute;
  left: -110px;
  top: 30px;
  background-color: #f9f9f9;
  min-width: 140px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 5px 0px;
  z-index: 1;
  transition: transform 0.5s ease, opacity 0.5s ease;
  transform-origin: top right;
}

/* When dropdown is visible */
.dropdown-content-enter-active {
  opacity: 1;
  transform: translateY(0);
}

/* Initial state of dropdown before it's visible */
.dropdown-content-enter {
  opacity: 0;
  transform: translateY(-20px);
}

.dropdown-content a {
  padding: 12px 12px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: var(--fc-gray-3);
  cursor: pointer;
}
</style>
