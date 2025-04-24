import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import AppHeader from './components/AppHeader.js';
import OrdersList from './components/OrdersList.js';
import MapView from './components/MapView.js';
import OrderDetails from './components/OrderDetails.js';

const app = createApp({
  components: {
    AppHeader,
    OrdersList,
    MapView,
    OrderDetails
  },
  data() {
    return {
      isSidebarOpen: false,
      isDetailsPanelOpen: false,
      selectedOrder: null,
      orders: [
        {
          id: 1,
          status: 'active',
          customer: 'Иванов Иван',
          address: 'ул. Ленина 15, кв. 42',
          time: '15:30-16:00',
          orderItems: [
            { name: 'Пицца "Маргарита"', quantity: 1 },
            { name: 'Кока-кола 0.5л', quantity: 2 }
          ],
          price: 850,
          coordinates: [55.751244, 37.618423],
          paymentMethod: 'Картой курьеру',
          notes: 'Домофон не работает, позвоните'
        },
        {
          id: 2,
          status: 'pending',
          customer: 'Петрова Мария',
          address: 'ул. Гагарина 22, кв. 15',
          time: '16:30-17:00',
          orderItems: [
            { name: 'Суши-сет "Филадельфия"', quantity: 1 },
            { name: 'Мисо-суп', quantity: 1 }
          ],
          price: 1450,
          coordinates: [55.746111, 37.622222],
          paymentMethod: 'Онлайн (оплачено)',
          notes: ''
        },
        {
          id: 3,
          status: 'completed',
          customer: 'Смирнов Алексей',
          address: 'ул. Пушкина 7, офис 212',
          time: '14:00-14:30',
          orderItems: [
            { name: 'Бизнес-ланч', quantity: 3 }
          ],
          price: 1200,
          coordinates: [55.760000, 37.630000],
          paymentMethod: 'Наличными',
          notes: 'Бизнес-центр "Меркурий", 2 этаж'
        }
      ],
      currentLocation: [55.753215, 37.622504]
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    selectOrder(order) {
      this.selectedOrder = order;
      this.isDetailsPanelOpen = true;
    },
    closeDetailsPanel() {
      this.isDetailsPanelOpen = false;
    },
    updateOrderStatus(order, newStatus) {
      const orderIndex = this.orders.findIndex(o => o.id === order.id);
      if (orderIndex > -1) {
        this.orders[orderIndex].status = newStatus;
      }
    }
  },
  template: `
    <div class="app-container">
      <app-header @toggle-sidebar="toggleSidebar" />
      
      <div class="main-content">
        <div class="sidebar" :class="{ 'open': isSidebarOpen }">
          <div class="d-block d-md-none mt-2">
            <div class="panel-handle" @click="toggleSidebar"></div>
          </div>
          <orders-list 
            :orders="orders" 
            :selected-order="selectedOrder"
            @select-order="selectOrder"
          />
        </div>
        
        <div class="content-area">
          <map-view 
            :orders="orders" 
            :current-location="currentLocation"
            :selected-order="selectedOrder"
            @select-order="selectOrder"
          />
          
          <order-details 
            v-if="selectedOrder"
            :order="selectedOrder" 
            :is-open="isDetailsPanelOpen"
            @close="closeDetailsPanel"
            @update-status="updateOrderStatus"
          />
        </div>
      </div>
    </div>
  `
});

app.mount('#app');
