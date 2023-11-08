<script setup>
import InvoiceCard from "./components/InvoiceCard.vue";
import PaginationButton from "./components/PaginationButton.vue";
import { onMounted, ref, computed, watch } from "vue";
import randomDate from "./utils/randomDate.js";
import DropdownSelect from "./components/DropdownSelect.vue";

// Reactive state for data and error
const data = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
const error = ref(null);
const userData = ref([]);
const dataLoading = ref(false);

// A method to fetch data from an API
const fetchData = async (pageNo) => {
  console.log("fetchData firing", Number(pageNo));
  dataLoading.value = true;
  try {
    const response = await fetch(`https://reqres.in/api/users?page=${pageNo}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    data.value = await response.json();
    totalPages.value = Number(data.value.total_pages);
    console.log("DATA", currentPage.value);
    const users = data.value.data.map((user) => {
      const randomStatus = Math.random() > 0.5 ? "Paid" : "Overdue";
      const randomAmount = Math.floor(Math.random() * 100000);
      return {
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        profileImageUrl: user.avatar,
        lastInvoiceDate: randomDate(),
        amount: randomAmount.toLocaleString(),
        status: randomStatus,
      };
    });
    userData.value = users;
    dataLoading.value = false;
  } catch (err) {
    console.log("error?", err);
    error.value = err;
    dataLoading.value = false;
  }
};

// watch the current page value, fetch new data when it changes
watch(currentPage, (newValue, oldValue) => {
  console.log("watch firing", newValue, oldValue);
  fetchData(newValue);
});

const disablePrevious = computed(() => {
  return currentPage.value === 1;
});
const disableNext = computed(() => {
  return currentPage.value === totalPages.value;
});
const handlePageChange = (page) => {
  console.log("handlePageChange firing", page);
  currentPage.value = Number(page);
};
const nextPage = () => {
  console.log("nextPage firing");
  currentPage.value += 1;
};
const previousPage = () => {
  console.log("previousPage firing");
  currentPage.value -= 1;
};

onMounted(() => {
  console.log("mounted");
  fetchData(1);
});
</script>

<template>
  <div class="w-full md:w-10/12 px-5 m-auto">
    <div v-if="error" class="min-h-[450px]">
      Oops! Something went wrong.
    </div>
    <div v-else>
      <header>
        <div class="wrapper flex-col ml-3 mb-5">
          <h1 class="font-bold text-3xl mb-2">Monthly Bookkeeping</h1>
          <p class="text-fc-gray-5">List of paid and outstanding invoices.</p>
        </div>
      </header>
  
      <main class="w-full">
        <Transition>
          <div v-if="!dataLoading && userData.length > 0">
            <div class="invoice-grid">
              <InvoiceCard
                :user="user"
                v-for="(user, index) in userData"
                :key="index"
              />
            </div>
          </div>
        </Transition>
        <div
          class="flex justify-between mx-0 md:mx-2 items-center"
          v-if="userData.length > 0"
        >
          <PaginationButton :disabled="disablePrevious" @click="previousPage"
            >Previous</PaginationButton
          >
          <DropdownSelect v-model="currentPage" @pageChanged="handlePageChange">
            <option v-for="page in totalPages" :key="page" :value="page">
              {{ page }}
            </option>
          </DropdownSelect>
          <PaginationButton :disabled="disableNext" @click="nextPage"
            >Next</PaginationButton
          >
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.invoice-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  /* grid-template-rows: repeat(2, 1fr); */
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  width: 100%;
}

@media (min-width: 600px) {
  .invoice-grid {
    grid-template-columns: repeat(
      2,
      1fr
    ); /* On screens wider than 600px, display 2 cards per row */
  }
}

@media (min-width: 900px) {
  .invoice-grid {
    grid-template-columns: repeat(
      3,
      1fr
    ); /* On screens wider than 900px, display 3 cards per row */
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
