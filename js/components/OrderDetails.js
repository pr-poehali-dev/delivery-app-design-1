export default {
  props: {
    order: {
      type: Object,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'update-status'],
  computed: {
    statusText() {
      switch (this.order.status) {
        case 'pending': return 'Ожидает';
        case 'active': return 'В работе';
        case 'completed': return 'Выполнен';
        default: return this.order.status;
      }
    },
    nextStatusAction() {
      switch (this.order.status) {
        case 'pending': return 'Принять заказ';
        case 'active': return 'Выполнить заказ';
        case 'completed': return '';
        default: return '';
      }
    },
    nextStatus() {
      switch (this.order.status) {
        case 'pending': return 'active';
        case 'active': return 'completed';
        default: return '';
      }
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    updateStatus() {
      if (this.nextStatus) {
        this.$emit('update-status', this.order, this.nextStatus);
      }
    },
    callCustomer() {
      // Имитация звонка клиенту
      alert('Звоним клиенту: +7 (XXX) XXX-XX-XX');
    },
    navigateToAddress() {
      // Имитация навигации по адресу
      alert('Открываем навигацию до адреса: ' + this.order.address);
    }
  },
  template: `
    <div class="order-details-panel p-3" :class="{ 'open': isOpen }">
      <div class="panel-handle" @click="close"></div>
      
      <div class="d-flex justify-content-between align-items-start mb-3">
        <h5 class="mb-0">Заказ #{{ order.id }}</h5>
        <span class="order-status" :class="'status-' + order.status">
          {{ statusText }}
        </span>
      </div>
      
      <div class="row mb-3">
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="card h-100">
            <div class="card-body">
              <h6 class="card-title">
                <i class="bi bi-person me-2"></i>Клиент
              </h6>
              <p class="card-text">{{ order.customer }}</p>
              <button class="btn btn-outline-primary btn-sm" @click="callCustomer">
                <i class="bi bi-telephone me-1"></i>Позвонить
              </button>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card h-100">
            <div class="card-body">
              <h6 class="card-title">
                <i class="bi bi-geo-alt me-2"></i>Адрес доставки
              </h6>
              <p class="card-text">{{ order.address }}</p>
              <button class="btn btn-outline-primary btn-sm" @click="navigateToAddress">
                <i class="bi bi-map me-1"></i>Навигация
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card mb-3">
        <div class="card-body">
          <h6 class="card-title">
            <i class="bi bi-basket me-2"></i>Состав заказа
          </h6>
          <ul class="list-group list-group-flush">
            <li v-for="(item, index) in order.orderItems" :key="index" class="list-group-item d-flex justify-content-between align-items-center px-0">
              {{ item.name }}
              <span class="badge bg-light text-dark">x{{ item.quantity }}</span>
            </li>
          </ul>
          <div class="d-flex justify-content-between mt-3">
            <span>Способ оплаты:</span>
            <span>{{ order.paymentMethod }}</span>
          </div>
          <div class="d-flex justify-content-between fw-bold">
            <span>Итого:</span>
            <span>{{ order.price }} ₽</span>
          </div>
        </div>
      </div>
      
      <div v-if="order.notes" class="card mb-3">
        <div class="card-body">
          <h6 class="card-title">
            <i class="bi bi-info-circle me-2"></i>Примечания
          </h6>
          <p class="card-text">{{ order.notes }}</p>
        </div>
      </div>
      
      <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-2">
        <button class="btn btn-outline-secondary me-md-2" @click="close">
          Закрыть
        </button>
        <button 
          v-if="nextStatusAction" 
          class="btn btn-primary" 
          @click="updateStatus"
        >
          {{ nextStatusAction }}
        </button>
      </div>
    </div>
  `
};
