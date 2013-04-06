{strip}
{form}
	{legend legend="General Settings"}
		<div class="control-group">
			{foreach from=$formTinyMCEFeatures key=item item=output}
				<div class="control-group">
					{formlabel label=$output.label for=$item}
					{forminput}
						{html_checkboxes name="$item" values="y" checked=$gBitSystem->getConfig($item) labels=false id=$item}
						{formhelp note=$output.note page=$output.page}
					{/forminput}
				</div>
			{/foreach}
		</div>

		<div class="control-group submit">
			<input type="hidden" name="page" value="{$page}" />
			<input type="submit" class="btn" name="change_prefs" value="{tr}Change preferences{/tr}" />
		</div>
	{/legend}
{/form}
{/strip}
