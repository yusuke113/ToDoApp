FactoryBot.define do
  factory :board do
    sequence(:title) { |n| "TEST_TITLE#{n}"}
    sequence(:user_id) { |n| n}
  end
end