export default {
  props: {
    orders: {
      type: Array,
      required: true
    },
    selectedOrder: {
      type: Object,
      default: null
    }
  },
  emits: ['select-order'],
  methods: {
    selectOrder(order) {
      this.$emit('select-order', order);
    },
    getStatusText(status) {
      switch (status) {
        case 'pending': return 'Ожидает';
        case 'active': return 'В работе';
        case 'completed': return 'Выполнен';
        default: return status;
      }
    }
  },
  template: `
    <div class="p-3">
      <h5 class="mb-3 d-flex justify-content-between align-items-center">
        Заказы на сегодня
        <span class="badge bg-primary rounded-pill">{{ orders.length }}</span>
      </h5>
      
      <div class="mb-3">
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-search"></i></span>
          <input type="text" class="form-control" placeholder="Поиск заказов...">
        </div>
      </div>
      
      <div class="orders-list">
        <div 
          v-for="order in orders" 
          :key="order.id" 
          class="card mb-2 order-card"
          :class="{ 'active': selectedOrder && selectedOrder.id === order.id }"
          @click="selectOrder(order)"
        >
          <div class="card-body py-2">
            <div class="d-flex justify-content-between align-items-start">
              <h6 class="card-title mb-1">{{ order.customer }}</h6>
              <span class="order-status ms-2" :class="'status-' + order.status">
                {{ getStatusText(order.status) }}
              </span>
            </div>
            <p class="card-text small mb-1 text-truncate">
              <i class="bi bi-geo-alt me-1"></i>{{ order.address }}
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">
                <i class="bi bi-clock me-1"></i>{{ order.time }}
              </small>
              <span class="fw-bold">{{ order.price }} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};
