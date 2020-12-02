import Vue from 'vue';
import {
  ActionSheet,
  // AddressEdit, AddressList, Area,
  Button,
  Card,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  // Circle, Col, Collapse, CollapseItem, ContactCard, ContactEdit, ContactList,
  // CountDown, Coupon, CouponCell, CouponList,
  DatetimePicker,
  Dialog,
  // Divider,
  DropdownItem,
  DropdownMenu,
  Field,
  GoodsAction,
  GoodsActionButton,
  GoodsActionIcon,
  Grid,
  GridItem,
  Icon,
  Image,
  // ImagePreview,
  IndexAnchor,
  IndexBar,
  // Info,
  Lazyload,
  // List,
  Loading,
  // Locale,
  NavBar,
  NoticeBar,
  Notify,
  NumberKeyboard,
  // Overlay,
  Pagination,
  // Panel,
  PasswordInput,
  Picker,
  Popup,
  // Progress,
  PullRefresh,
  Radio,
  RadioGroup,
  // Rate, Row,
  Search,
  Sidebar,
  SidebarItem,
  // Skeleton, Sku, Slider, Step, Stepper, Steps, Sticky,
  SubmitBar,
  Swipe,
  SwipeCell,
  SwipeItem,
  Switch,
  SwitchCell,
  Tab,
  Tabbar,
  TabbarItem,
  Tabs,
  Tag,
  Toast,
  TreeSelect,
  // Uploader,
} from 'vant';

Vue.use(ActionSheet)
// .use(AddressEdit) .use(AddressList) .use(Area)
  .use(Button)
  .use(Card)
  .use(Cell)
  .use(CellGroup)
  .use(Checkbox)
  .use(CheckboxGroup)
  // .use(Circle) .use(Col) .use(Collapse) .use(CollapseItem) .use(ContactCard)
  // .use(ContactEdit) .use(ContactList) .use(CountDown) .use(Coupon)
  // .use(CouponCell) .use(CouponList)
  .use(DatetimePicker)
  .use(Dialog)
  .use(DropdownItem)
  .use(DropdownMenu)
  .use(Field)
  .use(GoodsAction)
  .use(GoodsActionButton)
  .use(GoodsActionIcon)
  .use(Grid)
  .use(GridItem)
  .use(Icon)
  .use(Image)
  // .use(ImagePreview)
  .use(IndexAnchor)
  .use(IndexBar)
  // .use(Info)
  .use(Lazyload)
  // .use(List)
  .use(Loading)
  // .use(Locale)
  .use(NavBar)
  .use(NoticeBar)
  .use(Notify)
  .use(NumberKeyboard)
  // .use(Overlay)
  .use(Pagination)
  // .use(Panel)
  .use(PasswordInput)
  .use(Picker)
  .use(Popup)
  // .use(Progress)
  .use(PullRefresh)
  .use(Radio)
  .use(RadioGroup)
  // .use(Rate) .use(Row)
  .use(Search)
  .use(Sidebar)
  .use(SidebarItem)
  // .use(Skeleton) .use(Sku) .use(Slider) .use(Step) .use(Stepper) .use(Steps)
  // .use(Sticky)
  .use(SubmitBar)
  .use(Swipe)
  .use(SwipeCell)
  .use(SwipeItem)
  .use(Switch)
  .use(SwitchCell)
  .use(Tab)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Tabs)
  .use(Tag)
  .use(Toast)
  .use(TreeSelect)
// .use(Uploader);

Vue.prototype.$alert = Dialog.alert;
Vue.prototype.$confirm = Dialog.confirm;
