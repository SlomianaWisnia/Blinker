<template>
	<div :class="$style.settingsTabs">
		<router-link v-for="tab in settingsTabs" :to="tab.to" :key="tab.to">
			<img :src="tab.icon" :alt="tab.title">
			<p>{{ tab.title }}</p>
		</router-link>
	</div>
</template>

<script setup lang="ts">
import generalIcon from '@/assets/icons/settings/general.svg';
import appearanceIcon from '@/assets/icons/settings/appearance.svg';
import chatIcon from '@/assets/icons/footer/chat.svg';
import callIcon from '@/assets/icons/footer/call.svg';
import notificationsIcon from '@/assets/icons/settings/notifications.svg';
import privacyIcon from '@/assets/icons/settings/privacy.svg';

const settingsTabs = [
	{
		title: 'General',
		to: '/settings/general',
		icon: generalIcon
	},
	{
		title: 'Appearance',
		to: '/settings/appearance',
		icon: appearanceIcon
	},
	{
		title: 'Chats',
		to: '/settings/chats',
		icon: chatIcon
	},
	{
		title: 'Calls',
		to: '/settings/calls',
		icon: callIcon
	},
	{
		title: 'Notifications',
		to: '/settings/notifications',
		icon: notificationsIcon
	},
	{
		title: 'Privacy',
		to: '/settings/privacy',
		icon: privacyIcon
	},
];
</script>

<style module lang="scss">
.settingsTabs {
	display: flex;
	flex-direction: column;
	padding: 0 2.2rem;

	a {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		text-decoration: none;
		color: inherit;
		font-size: 1.15rem;
		margin-bottom: 2rem;

		img {
			width: 27px;
		}
	}

	a:nth-of-type(2),
	a:nth-of-type(4) {
		border-bottom: 1px solid rgba(128, 128, 128, 0.336);
		padding-bottom: 2rem;
	}
}
</style>