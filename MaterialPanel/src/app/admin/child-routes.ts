import { EditPostComponent } from './edit-post/edit-post.component';
import { ProfileComponent } from './profile/profile.component';
import { PublishPostComponent } from './publish-post/publish-post.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';

export const childRoutes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { icon: 'dashboard', text: 'Anasayfa',disabled:false }
  },
 
   {
    path: "users", // <= Page URL
    component: UserListComponent, // <= Page component registration,
    data: { icon: 'people', text: 'Kullanıcılar',disabled:false }
  },
  {
    path: "user_add", // <= Page URL
    component: UserAddComponent, // <= Page component registration,
    data: { icon: 'add', text: 'Kullanıcı Ekle' ,disabled:false}
  },
  {
    path: "user_edit/:id", // <= Page URL
    component: UserEditComponent, // <= Page component registration,
    data: { icon: 'edit', text: 'Kullanıcı Düzenle',disabled:true }
  },
  {
    path: "publish_post", // <= Page URL
    component: PublishPostComponent, // <= Page component registration,
    data: { icon: 'publish', text: 'Gönderi Paylaş',disabled:false }
  },
  {
    path: "edit_post/:id", // <= Page URL
    component: EditPostComponent, // <= Page component registration,
    data: { icon: 'edit', text: 'Gönderi Düzenle',disabled:true }
  },
 

];
