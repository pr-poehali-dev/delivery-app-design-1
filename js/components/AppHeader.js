export default {
  emits: ['toggle-sidebar'],
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    }
  },
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <i class="bi bi-truck me-2"></i>КурьерПро
        </a>
        
        <div class="d-flex align-items-center">
          <button class="btn btn-outline-light me-2 d-md-none" @click="toggleSidebar">
            <i class="bi bi-list"></i>
          </button>
          
          <div class="dropdown">
            <button class="btn btn-outline-light dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-person-circle me-1"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li><span class="dropdown-item-text fw-bold">Иван Курьеров</span></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i>Настройки</a></li>
              <li><a class="dropdown-item" href="#"><i class="bi bi-question-circle me-2"></i>Помощь</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#"><i class="bi bi-box-arrow-right me-2"></i>Выйти</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  `
};
