{strip}
{form}
	{legend legend="General Settings"}
		<div class="form-group">
			{foreach from=$formTinyMCEFeatures key=item item=output}
				<div class="form-group">
					{formlabel label=$output.label for=$item}
					{forminput}
						{html_checkboxes name="$item" values="y" checked=$gBitSystem->getConfig($item) labels=false id=$item}
						{formhelp note=$output.note page=$output.page}
					{/forminput}
				</div>
			{/foreach}
		</div>

		<div class="form-group submit">
			<input type="hidden" name="page" value="{$page}" />
			<input type="submit" class="btn btn-default" name="change_prefs" value="{tr}Change preferences{/tr}" />
		</div>
	{/legend}
{/form}
{/strip}
