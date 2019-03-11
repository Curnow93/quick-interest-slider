<?php
qis_messages();

// Builds and manages the applications table 
function qis_messages() {
    
    $content=$current=$all=$qis_edit=false;
    $selected = array();
    
    // Delete all applications
    if( isset( $_POST['qis_reset_message'])) {
        delete_option('qis_messages');
        qis_admin_notice(__('All applications have been deleted','quick-interest-slider').'.');
    }
    
    // Delete selected applications
    if( isset($_POST['qis_delete_selected'])) {
        $event = $_POST["qis_download_form"];
        $message = get_option('qis_messages');
        $count = count($message);
        for($i = 0; $i <= $count; $i++) {
            if ($_POST[$i] == 'checked') {
                unset($message[$i]);
            }
        }
        $message = array_values($message);
        update_option('qis_messages', $message );
        qis_admin_notice(__('Selected applications have been deleted','quick-interest-slider').'.');
    }
    
    // Approve Selected Applications
    if( isset($_POST['qis_approve_selected'])) {
        $message = get_option('qis_messages');
        foreach ($message as $key => $value ) {
            if ($_POST[$key] == 'checked') {
                $message[$key]['confirmed'] = true;
            }
        }
        update_option('qis_messages', $message );
        qis_admin_notice(__('Selected applications have been approved','quick-interest-slider').'.');
    }

    // Send applications as email
    if( isset($_POST['qis_emaillist'])) {
        $message = get_option('qis_messages');
        $content = qis_build_registration_table ($message,'report',null,null);
        $sendtoemail = $_POST['sendtoemail'];
        $headers = "From: {<{$qis_email}>\r\n"."MIME-Version: 1.0\r\n"."Content-Type: text/html; charset=\"utf-8\"\r\n";	
        wp_mail($sendtoemail, 'Loan Applications', $content, $headers);
        qis_admin_notice(__('Application list has been sent to','quick-interest-slider').' '.$sendtoemail.'.');
    }

    // Update edited applications
    if( isset($_POST['qis_update'])) {
        $arr = array('yourname','youremail','yourtelephone','yourmessage','yourchecks','yourdropdown','yourradio','loan-amount','loan-period');
        $message = get_option('qis_messages');
        
		// Loop through the $_POST['message'] array
		foreach ($_POST['message'] as $id => $row) {
			// Loop through the row thats contained in the message array entry
			foreach ($row as $k => $v) {
				// Do the same value assignment you make in your code
				$message[$id][$k] = $v;
			}
		}
        update_option('qis_messages',$message);
        qis_admin_notice(__('Applications have been updated','quick-interest-slider'));
    }
    
    // Edit all applications
    if( isset($_POST['qis_edit'])) {
        $qis_edit = 'all';
    }
    
    // Edit selected applications
    if( isset($_POST['qis_edit_selected']) ) {
        $qis_edit = 'selected';
        $selected = $_POST;
    }
    
    $message = get_option('qis_messages');
    
    global $current_user;
    get_currentuserinfo();
    
    if (!$sendtoemail) {
        $sendtoemail = $current_user->user_email;
    }

    if(!is_array($message)) $message = array();
    $dashboard = '<div class="wrap">
    <h1>'.__('Loan Applications','quick-interest-slider').'</h1>
    <div id="qis-widget">
    <form method="post" id="qis_download_form" action="">';
    $content = qis_build_registration_table ($message,'',$qis_edit,$selected);
    if ($content) {
        $dashboard .= $content;
        $dashboard .='<p><input type="submit" name="qis_reset_message" class="button-secondary" value="'.__('Delete all applications','quick-interest-slider').'" onclick="return window.confirm( \'Are you sure you want to delete all the applications?\' );"/>
        <input type="submit" name="qis_delete_selected" class="button-secondary" value="'.__('Delete Selected','quick-interest-slider').'" onclick="return window.confirm( \'Are you sure you want to delete the selected applications?\' );"/> 
        <input type="submit" name="qis_approve_selected" class="button-secondary" value="'.__('Approve Selected','quick-interest-slider').'" onclick="return window.confirm( \'Are you sure you want to approve the selected applications?\' );"/> ';
        if ($qis_edit) $dashboard .= '<input type="submit" name="qis_update" class="button-primary" value="'.__('Update Applications','quick-interest-slider').'" /> ';
        else $dashboard .= '<input type="submit" name="qis_edit" class="button-secondary" value="'.__('Edit Applications','quick-interest-slider').'" /> <input type="submit" name="qis_edit_selected" class="button-secondary" value="'.__('Edit Selected','quick-interest-slider').'" /> ';
        $dashboard .= '<input type="submit" name="qis_cancel" class="button-secondary" value="'.__('Cancel','quick-interest-slider').'" /></p>
        <p>'.__('Send applications to this email address','quick-interest-slider').': <input type="text" name="sendtoemail" value="'.$sendtoemail.'">&nbsp;
        <input type="submit" name="qis_emaillist" class="button-primary" value="'.__('Email List','quick-interest-slider').'" /></p>
        </form>';
    } else {
        $dashboard .= '<p>'.__('There are no applications','quick-interest-slider').'</p>';
    }
    $dashboard .= '</div></div>';		
    echo $dashboard;
}