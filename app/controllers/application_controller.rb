class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

    # deviseのstrong parameter設定
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
    end

    def after_sign_out_path_for(resource)
      new_user_session_path
    end

    # ユーザーのログインを確認する
    def logged_in_user
      unless user_signed_in?
        flash[:alert] = "Please log in."
        redirect_to new_user_session_path
      end
    end


end